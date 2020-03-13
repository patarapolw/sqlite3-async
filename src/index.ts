// Based on
// Type definitions for sqlite3 3.1
// Project: http://github.com/mapbox/node-sqlite3
// Definitions by: Nick Malaguti <https://github.com/nmalaguti>
//                 Sumant Manne <https://github.com/dpyro>
//                 Behind The Math <https://github.com/BehindTheMath>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// @ts-ignore
import sqlite3 from 'sqlite3'
// import { promisifyAll } from 'bluebird'

// events is required for typing
import events from 'events'

export const OPEN_READONLY: number = sqlite3.OPEN_READONLY
export const OPEN_READWRITE: number = sqlite3.OPEN_READWRITE
export const OPEN_CREATE: number = sqlite3.OPEN_CREATE
export const OPEN_SHAREDCACHE: number = sqlite3.OPEN_SHAREDCACHE
export const OPEN_PRIVATECACHE: number = sqlite3.OPEN_PRIVATECACHE
export const OPEN_URI: number = sqlite3.OPEN_URI

export const cached: {
  Database(filename: string, callback?: (this: Database, err: Error | null) => void): Database;
  Database(filename: string, mode?: number, callback?: (this: Database, err: Error | null) => void): Database;
} = sqlite3.cached

export interface RunResult extends Statement {
  lastID: number;
  changes: number;
}

export interface Statement {
  bind(callback?: (err: Error | null) => void): this;
  bind(...params: any[]): this;
  bindAsync(...params: any[]): Promise<this>;

  reset(callback?: (err: null) => void): this;
  resetAsync(): Promise<this>;

  finalize(callback?: (err: Error) => void): Database;
  finalizeAsync(): Promise<this>;

  run(callback?: (err: Error | null) => void): this;
  run(params: any, callback?: (this: RunResult, err: Error | null) => void): this;
  run(...params: any[]): this;
  runAsync(...params: any[]): Promise<this>;

  get(callback?: (err: Error | null, row?: any) => void): this;
  get(params: any, callback?: (this: RunResult, err: Error | null, row?: any) => void): this;
  get(...params: any[]): this;
  getAsync(...params: any[]): Promise<this>;

  all(callback?: (err: Error | null, rows: any[]) => void): this;
  all(params: any, callback?: (this: RunResult, err: Error | null, rows: any[]) => void): this;
  all(...params: any[]): this;
  allAsync(...params: any[]): Promise<this>;

  each(callback?: (err: Error | null, row: any) => void, complete?: (err: Error | null, count: number) => void): this;
  each(params: any, callback?: (this: RunResult, err: Error | null, row: any) => void, complete?: (err: Error | null, count: number) => void): this;
  each(...params: any[]): this;
  eachAsync(...params: any[]): Promise<this>;
}

export interface Database extends events.EventEmitter {
  open(filename: string, callback?: (err: Error | null) => void): Database;
  open(filename: string, mode?: number, callback?: (err: Error | null) => void): Database;
  openAsync(filename: string, mode?: number): Promise<Database>

  close(callback?: (err: Error | null) => void): void;
  closeAsync(): Promise<void>;

  run(sql: string, callback?: (this: RunResult, err: Error | null) => void): this;
  run(sql: string, params: any, callback?: (this: RunResult, err: Error | null) => void): this;
  run(sql: string, ...params: any[]): this;
  runAsync(sql: string, ...params: any[]): Promise<this>;

  get(sql: string, callback?: (this: Statement, err: Error | null, row: any) => void): this;
  get(sql: string, params: any, callback?: (this: Statement, err: Error | null, row: any) => void): this;
  get(sql: string, ...params: any[]): this;
  getAsync(sql: string, ...params: any[]): Promise<this>;

  all(sql: string, callback?: (this: Statement, err: Error | null, rows: any[]) => void): this;
  all(sql: string, params: any, callback?: (this: Statement, err: Error | null, rows: any[]) => void): this;
  all(sql: string, ...params: any[]): this;
  allAsync(sql: string, ...params: any[]): Promise<this>;

  each(sql: string, callback?: (this: Statement, err: Error | null, row: any) => void, complete?: (err: Error | null, count: number) => void): this;
  each(sql: string, params: any, callback?: (this: Statement, err: Error | null, row: any) => void, complete?: (err: Error | null, count: number) => void): this;
  each(sql: string, ...params: any[]): this;
  eachAsync(sql: string, ...params: any[]): Promise<this>;

  exec(sql: string, callback?: (this: Statement, err: Error | null) => void): this;
  execAsync(sql: string): Promise<this>;

  prepare(sql: string, callback?: (this: Statement, err: Error | null) => void): Statement;
  prepare(sql: string, params: any, callback?: (this: Statement, err: Error | null) => void): Statement;
  prepare(sql: string, ...params: any[]): Statement;
  prepareAsync(sql: string, ...params: any[]): Promise<Statement>;

  serialize(callback?: () => void): void;
  parallelize(callback?: () => void): void;

  on(event: "trace", listener: (sql: string) => void): this;
  on(event: "profile", listener: (sql: string, time: number) => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: "open" | "close", listener: () => void): this;
  on(event: string, listener: (...args: any[]) => void): this;

  configure(option: "busyTimeout", value: number): void;
  interrupt(): void;
}

export const verbose: () => sqlite3 = sqlite3.verbose()

export interface sqlite3 {
  OPEN_READONLY: number;
  OPEN_READWRITE: number;
  OPEN_CREATE: number;
  OPEN_SHAREDCACHE: number;
  OPEN_PRIVATECACHE: number;
  OPEN_URI: number;
  cached: typeof cached;
  RunResult: RunResult;
  Statement: Statement;
  Database: Database;
  verbose(): this;
}

const Statement = sqlite3.Statement
const Database = sqlite3.Database

Database.open = function () {
  return new Database(arguments)
}

try {
  const { promisifyAll } = require('bluebird')
  promisifyAll(sqlite3)
} catch (_) {
  const { promisifyAll } = require('./promisify-all')
  promisifyAll(sqlite3)
}

module.exports = sqlite3
