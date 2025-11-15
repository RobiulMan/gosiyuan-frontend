import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// TYPES
// ============================================================================

interface LogEntry {
  level: "DEBUG" | "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "CRITICAL";
  timestamp: string;
  context: string;
  message: string;
  requestId: string;
  query?: string;
  data?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

interface LogMetrics {
  totalLogs: number;
  byLevel: Record<string, number>;
  errorRate: number;
  successRate: number;
  lastUpdated: string;
}

// ============================================================================
// IN-MEMORY LOG STORE (Production: use database)
// ============================================================================

class LogStore {
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 10000;
  private metrics: LogMetrics = {
    totalLogs: 0,
    byLevel: {
      DEBUG: 0,
      INFO: 0,
      SUCCESS: 0,
      WARNING: 0,
      ERROR: 0,
      CRITICAL: 0,
    },
    errorRate: 0,
    successRate: 0,
    lastUpdated: new Date().toISOString(),
  };

  addLog(log: LogEntry): void {
    this.logs.push(log);

    // Remove oldest logs if exceeds max
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    this.updateMetrics();
  }

  addLogs(newLogs: LogEntry[]): void {
    newLogs.forEach((log) => this.addLog(log));
  }

  private updateMetrics(): void {
    const totalLogs = this.logs.length;
    const byLevel = {
      DEBUG: 0,
      INFO: 0,
      SUCCESS: 0,
      WARNING: 0,
      ERROR: 0,
      CRITICAL: 0,
    };
    let errorCount = 0;
    let successCount = 0;

    this.logs.forEach((log) => {
      byLevel[log.level]++;

      if (log.level === "ERROR" || log.level === "CRITICAL") {
        errorCount++;
      } else if (log.level === "SUCCESS") {
        successCount++;
      }
    });

    this.metrics = {
      totalLogs,
      byLevel,
      errorRate: totalLogs > 0 ? (errorCount / totalLogs) * 100 : 0,
      successRate: totalLogs > 0 ? (successCount / totalLogs) * 100 : 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  getLogs(filter?: {
    level?: string;
    limit?: number;
    offset?: number;
  }): LogEntry[] {
    let filtered = [...this.logs];

    if (filter?.level) {
      filtered = filtered.filter((log) => log.level === filter.level);
    }

    const offset = filter?.offset || 0;
    const limit = Math.min(filter?.limit || 100, 1000);

    return filtered.slice(-offset - limit, filtered.length - offset);
  }

  getMetrics(): LogMetrics {
    return { ...this.metrics };
  }

  clearOldLogs(olderThanMinutes: number = 60): number {
    const cutoffTime = new Date(Date.now() - olderThanMinutes * 60000);
    const initialLength = this.logs.length;

    this.logs = this.logs.filter((log) => new Date(log.timestamp) > cutoffTime);

    this.updateMetrics();
    return initialLength - this.logs.length;
  }

  searchLogs(query: string): LogEntry[] {
    const queryLower = query.toLowerCase();
    return this.logs.filter((log) => {
      const searchText =
        `${log.message} ${JSON.stringify(log.data || {})} ${log.context}`.toLowerCase();
      return searchText.includes(queryLower);
    });
  }

  exportLogs(format: "json" | "csv" = "json"): string {
    if (format === "csv") {
      return this.logsToCSV();
    }
    return JSON.stringify(this.logs, null, 2);
  }

  private logsToCSV(): string {
    const headers = [
      "Timestamp",
      "Level",
      "Context",
      "Message",
      "Request ID",
      "Data",
    ];
    const rows = this.logs.map((log) => [
      log.timestamp,
      log.level,
      log.context,
      log.message,
      log.requestId,
      JSON.stringify(log.data || {}),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    return csvContent;
  }

  getLogsByRequestId(requestId: string): LogEntry[] {
    return this.logs.filter((log) => log.requestId === requestId);
  }
}

// Singleton instance
const logStore = new LogStore();

// ============================================================================
// API HANDLERS
// ============================================================================

/**
 * POST /api/logs/aggregator
 * Add new log entries
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Accept single log or array of logs
    const logs = Array.isArray(body) ? body : [body];

    // Validate and add logs
    logs.forEach((log: LogEntry) => {
      if (!log.level || !log.timestamp || !log.message || !log.requestId) {
        console.error("Invalid log entry:", log);
        return;
      }
      logStore.addLog(log);
    });

    return NextResponse.json(
      {
        success: true,
        message: `${logs.length} log(s) added`,
        logsCount: logStore.getLogs().length,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Log aggregation error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to process logs",
      },
      { status: 400 },
    );
  }
}

/**
 * GET /api/logs/aggregator
 * Retrieve logs with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action") || "list";
    const level = searchParams.get("level");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search");
    const requestId = searchParams.get("requestId");
    const format = (searchParams.get("format") as "json" | "csv") || "json";

    // Metrics endpoint
    if (action === "metrics") {
      return NextResponse.json(
        {
          success: true,
          metrics: logStore.getMetrics(),
        },
        { status: 200 },
      );
    }

    // Search endpoint
    if (action === "search" && search) {
      const results = logStore.searchLogs(search);
      return NextResponse.json(
        {
          success: true,
          results,
          count: results.length,
        },
        { status: 200 },
      );
    }

    // Get logs by request ID
    if (action === "request" && requestId) {
      const results = logStore.getLogsByRequestId(requestId);
      return NextResponse.json(
        {
          success: true,
          results,
          count: results.length,
        },
        { status: 200 },
      );
    }

    // Export endpoint
    if (action === "export") {
      const data = logStore.exportLogs(format);
      const mimeType = format === "csv" ? "text/csv" : "application/json";
      const filename = `logs-${Date.now()}.${format}`;

      return new Response(data, {
        status: 200,
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    // List logs
    const logs = logStore.getLogs({
      level: level || undefined,
      limit,
      offset,
    });

    return NextResponse.json(
      {
        success: true,
        logs,
        count: logs.length,
        total: logStore.getLogs().length,
        metrics: logStore.getMetrics(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Log retrieval error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to retrieve logs",
      },
      { status: 400 },
    );
  }
}

/**
 * DELETE /api/logs/aggregator
 * Clear old logs
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const olderThanMinutes = parseInt(searchParams.get("olderThan") || "60");

    const deletedCount = logStore.clearOldLogs(olderThanMinutes);

    return NextResponse.json(
      {
        success: true,
        message: `Deleted ${deletedCount} old log(s)`,
        remainingLogs: logStore.getLogs().length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Log deletion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete logs",
      },
      { status: 400 },
    );
  }
}
