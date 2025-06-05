/**
 * Environment Variables Validation
 * 12Factor App Principle: Configuration
 */

interface EnvironmentConfig {
  AUTH0_SECRET: string;
  AUTH0_BASE_URL: string;
  AUTH0_ISSUER_BASE_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  NODE_ENV: string;
}

/**
 * Environment variable validation
 */
function validateEnvironmentVariable(
  key: string,
  value: string | undefined
): string {
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined`);
  }
  return value;
}

/**
 * Validate required environment variables
 */
export function validateEnvironment(): EnvironmentConfig {
  const requiredVars = [
    "AUTH0_SECRET",
    "AUTH0_BASE_URL",
    "AUTH0_ISSUER_BASE_URL",
    "AUTH0_CLIENT_ID",
    "AUTH0_CLIENT_SECRET",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "NODE_ENV",
  ] as const;

  const config: Partial<EnvironmentConfig> = {};

  for (const varName of requiredVars) {
    config[varName] = validateEnvironmentVariable(
      varName,
      process.env[varName]
    );
  }

  return config as EnvironmentConfig;
}

/**
 * Environment checks
 */
export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === "development";
export const isProduction = (): boolean =>
  process.env.NODE_ENV === "production";
