// lib/services/LoggerService.ts

interface SearchContext {
  requestId: string;
  query?: string;
  timestamp?: number | string; // Accept both number and string
  duration?: number;
  userId?: string;
  sessionId?: string;
}

// ============================================================================
// LOGGER SERVICE CLASS
// ============================================================================

export class LoggerService {
  private context: SearchContext;
  private logQueue: Array<any> = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private readonly maxQueueSize = 50;
  private readonly flushInterval = 5000; // 5 seconds

  constructor(context: SearchContext) {
    this.context = {
      ...context,
      // Ensure timestamp is always a number
      timestamp:
        typeof context.timestamp === "string"
          ? new Date(context.timestamp).getTime()
          : context.timestamp || Date.now(),
    };
    this.initializeFlushTimer();
  }

  // ========================================================================
  // PRIVATE METHODS
  // ========================================================================

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatContext(): string {
    const parts = [this.context.requestId];
    if (this.context.userId) parts.push(`uid:${this.context.userId}`);
    if (this.context.sessionId) parts.push(`sid:${this.context.sessionId}`);
    return `[${parts.join("|")}]`;
  }

  private formatDuration(): string {
    if (!this.context.duration) return "";
    return ` (${this.context.duration}ms)`;
  }

  private maskSensitiveData(data: string): string {
    // Mask emails
    data = data.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, "[EMAIL]");
    // Mask phone numbers
    data = data.replace(/\d{3}-\d{3}-\d{4}/g, "[PHONE]");
    // Truncate long strings
    if (data.length > 100) return `${data.substring(0, 100)}...`;
    return data;
  }

  private maskUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      // Remove sensitive params like tokens
      const sensitiveParams = ["token", "apikey", "password", "authorization"];
      sensitiveParams.forEach((param) => {
        if (urlObj.searchParams.has(param)) {
          urlObj.searchParams.set(param, "[MASKED]");
        }
      });
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  private createLogEntry(
    level: string,
    message: string,
    data?: any,
    error?: Error | any,
  ) {
    return {
      level,
      timestamp: this.formatTimestamp(),
      context: this.formatContext(),
      message,
      requestId: this.context.requestId,
      ...(this.context.query && { query: this.context.query }),
      ...(data && { data }),
      ...(error && {
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
      }),
    };
  }

  private logToConsole(entry: any): void {
    if (process.env.NODE_ENV === "development") {
      const emoji = this.getEmoji(entry.level);
      const style = this.getConsoleStyle(entry.level);
      console.log(
        `%c${emoji} [${entry.level}] ${entry.message}`,
        style,
        entry.data || entry.error || "",
      );
    } else {
      const method =
        entry.level === "ERROR" || entry.level === "CRITICAL"
          ? "error"
          : entry.level === "WARNING"
            ? "warn"
            : "log";
      console[method](JSON.stringify(entry));
    }
  }

  private getEmoji(level: string): string {
    const emojis: Record<string, string> = {
      DEBUG: "🔍",
      INFO: "ℹ️",
      SUCCESS: "✅",
      WARNING: "⚠️",
      ERROR: "❌",
      CRITICAL: "🔴",
    };
    return emojis[level] || "📝";
  }

  private getConsoleStyle(level: string): string {
    const styles: Record<string, string> = {
      DEBUG: "color: #7c3aed",
      INFO: "color: #3b82f6",
      SUCCESS: "color: #10b981",
      WARNING: "color: #f59e0b",
      ERROR: "color: #ef4444",
      CRITICAL: "color: #dc2626",
    };
    return styles[level] || "color: #6b7280";
  }

  private queueLog(entry: any): void {
    this.logQueue.push(entry);

    // Flush if queue is full
    if (this.logQueue.length >= this.maxQueueSize) {
      this.flush();
    }
  }

  private initializeFlushTimer(): void {
    this.flushTimer = setInterval(() => this.flush(), this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.logQueue.length === 0) return;

    const logsToSend = [...this.logQueue];
    this.logQueue = [];

    try {
      await fetch("/api/logs/aggregator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logsToSend),
      });
    } catch (error) {
      console.error("Failed to send logs to server:", error);
      // Re-queue logs if failed
      this.logQueue = [...logsToSend, ...this.logQueue].slice(
        0,
        this.maxQueueSize,
      );
    }
  }

  // ========================================================================
  // PUBLIC LOG METHODS
  // ========================================================================

  info(message: string, data?: any): void {
    const log = this.createLogEntry("INFO", message, data);
    this.logToConsole(log);
    this.queueLog(log);
  }

  success(message: string, data?: any): void {
    const log = this.createLogEntry("SUCCESS", message, data);
    this.logToConsole(log);
    this.queueLog(log);
  }

  warning(message: string, data?: any): void {
    const log = this.createLogEntry("WARNING", message, data);
    this.logToConsole(log);
    this.queueLog(log);
  }

  error(message: string, error?: Error | any): void {
    const log = this.createLogEntry("ERROR", message, undefined, error);
    this.logToConsole(log);
    this.queueLog(log);
  }

  critical(message: string, error?: Error | any): void {
    const log = this.createLogEntry("CRITICAL", message, undefined, error);
    this.logToConsole(log);
    this.queueLog(log);
    // Immediately flush critical errors
    this.flush();
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== "development") return;
    const log = this.createLogEntry("DEBUG", message, data);
    this.logToConsole(log);
    this.queueLog(log);
  }

  // ========================================================================
  // DOMAIN-SPECIFIC LOGGING METHODS
  // ========================================================================

  logRequestStart(query: string, limit: number): void {
    this.info("Search request initiated", {
      query: this.maskSensitiveData(query),
      limit,
      timestamp: this.formatTimestamp(),
    });
  }

  logValidation(isValid: boolean, errors?: string[]): void {
    if (isValid) {
      this.success("Query validation passed", {
        query: this.context.query,
      });
    } else {
      this.warning("Query validation failed", { errors });
    }
  }

  logStrapiRequest(url: string, method: string): void {
    this.debug("Strapi API request", {
      url: this.maskUrl(url),
      method,
    });
  }

  logStrapiResponse(status: number, resultCount: number, total: number): void {
    this.success("Strapi API response received", {
      status,
      resultsCount: resultCount,
      totalAvailable: total,
    });
  }

  logTransformation(inputCount: number, outputCount: number): void {
    const successRate = ((outputCount / Math.max(inputCount, 1)) * 100).toFixed(
      2,
    );
    this.success("Data transformation completed", {
      inputCount,
      outputCount,
      transformationSuccessRate: `${successRate}%`,
    });
  }

  logRequestComplete(resultCount: number, duration: number): void {
    this.context.duration = duration;
    this.success("Search request completed successfully", {
      query: this.context.query,
      resultCount,
      duration: `${duration}ms`,
      averageTimePerResult: `${(duration / Math.max(resultCount, 1)).toFixed(
        2,
      )}ms`,
    });
  }

  logError(errorMessage: string, statusCode: number, error?: Error): void {
    this.error("Search request failed", {
      query: this.context.query,
      statusCode,
      errorMessage,
      ...(error && { errorDetails: error.message }),
    });
  }

  // Checkout-specific logging
  logOrderEvent(
    event: "created" | "updated" | "cancelled" | "completed",
    orderId: string,
    details?: any,
  ): void {
    this.success(`Order ${event}`, {
      orderId,
      ...details,
    });
  }

  logPaymentTransaction(
    transactionId: string,
    amount: number,
    status: "pending" | "success" | "failed",
    method: string,
    error?: Error,
  ): void {
    const logMethod = status === "success" ? "success" : "warning";
    this[logMethod](`Payment transaction ${status}`, {
      transactionId,
      amount,
      method,
      ...(error && { error: error.message }),
    });
  }

  logPerformanceMetric(
    metricName: string,
    value: number,
    unit: string,
    threshold?: number,
  ): void {
    const isSlowOrHigh = threshold !== undefined && value > threshold;
    const method = isSlowOrHigh ? "warning" : "info";

    this[method](`Performance metric: ${metricName}`, {
      value,
      unit,
      threshold,
      exceeded: isSlowOrHigh,
    });
  }

  logDatabaseOperation(
    operation: string,
    collection: string,
    duration: number,
    success: boolean,
    error?: Error,
  ): void {
    if (success) {
      this.success(`Database operation completed`, {
        operation,
        collection,
        duration: `${duration}ms`,
      });
    } else {
      this.error(`Database operation failed`, error);
    }
  }

  logAuthEvent(
    event: "login" | "logout" | "signup" | "failed",
    userId?: string,
    details?: any,
  ): void {
    const message =
      event === "failed" ? "Authentication failed" : `User ${event}`;
    this.info(message, {
      userId,
      event,
      ...details,
    });
  }

  // ========================================================================
  // CLEANUP
  // ========================================================================

  async destroy(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    await this.flush();
  }
}

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Create a new LoggerService instance
 * @param requestId - Unique identifier for this request/session
 * @param context - Additional context information (query, userId, sessionId, etc.)
 * @returns LoggerService instance
 *
 * @example
 * const logger = createLogger('search-123');
 * const logger = createLogger('checkout-456', { userId: 'user-789' });
 */
export function createLogger(
  requestId: string,
  context?: Partial<SearchContext>,
): LoggerService {
  const fullContext: SearchContext = {
    requestId,
    timestamp: Date.now(),
    ...context,
  };

  return new LoggerService(fullContext);
}

/**
 * Create a logger with an auto-generated request ID
 * @param prefix - Prefix for the request ID (e.g., 'search', 'checkout')
 * @param context - Additional context information
 * @returns LoggerService instance
 *
 * @example
 * const logger = createLoggerWithAutoId('search', { query: 'laptop' });
 */
export function createLoggerWithAutoId(
  prefix: string,
  context?: Partial<SearchContext>,
): LoggerService {
  const requestId = `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return createLogger(requestId, context);
}
