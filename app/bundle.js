(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@minima-global/mds-api/lib/command.ts
  var command_exports = {};
  __export(command_exports, {
    Commands: () => Commands,
    commands: () => commands
  });
  var Commands, commands;
  var init_command = __esm({
    "node_modules/@minima-global/mds-api/lib/command.ts"() {
      Commands = class {
        constructor(path = "./mds/command") {
          this.send = async (args) => {
            return this._executeCmd({ name: "send", args });
          };
          this.newaddress = async () => {
            return this._executeCmd({ name: "newaddress", args: {} });
          };
          this.getaddress = async () => {
            return this._executeCmd({ name: "getaddress", args: {} });
          };
          this.tokencreate = async (args) => {
            return this._executeCmd({ name: "tokencreate", args });
          };
          this.status = async () => {
            return await this._executeCmd({ name: "status", args: {} });
          };
          this.txpow_txpowid = async (txpowId) => {
            return this._executeCmd({ name: "txpow", args: { txpowid: `${txpowId}` } });
          };
          this.txpow_block = async (blockNumber) => {
            return this._executeCmd({
              name: "txpow",
              args: { block: `${blockNumber}` }
            });
          };
          this.txpow_address = async (address) => {
            return this._executeCmd({ name: "txpow", args: { address } });
          };
          this.balance = async () => {
            return this._executeCmd({ name: "balance", args: {} });
          };
          this.message = async ({
            to,
            content,
            application
          }) => {
            return this._executeCmd({
              name: "maxima",
              args: { action: "send", to, data: `${content}`, application }
            });
          };
          this.maxima = async () => {
            return this._executeCmd({ name: "maxima", args: {} });
          };
          this.network = async () => {
            return await this._executeCmd({
              name: "network",
              args: {}
            });
          };
          this.help = async () => {
            return this._executeCmd({ name: "help", args: {} });
          };
          this.custom = async (command) => {
            return this._executeCmd(command);
          };
          this.runscript = async (data) => {
            return this._executeCmd({ name: "runscript", args: { ...data } });
          };
          this._executeCmd = async (command) => {
            if (window.executeCommand === void 0) {
              return await this._windowfetchCmd(command);
            } else {
              return await Promise.resolve(this._runnableFetchCmd(command));
            }
          };
          this._runnableFetchCmd = async (command) => {
            const commandOutput = JSON.parse(window.executeCommand(JSON.stringify(command)));
            if (commandOutput.status) {
              return commandOutput.response;
            } else {
              throw new Error(commandOutput.error ? commandOutput.error : commandOutput.message);
            }
          };
          this._windowfetchCmd = async (command) => {
            const requestOptions = {
              method: "POST",
              mode: "cors",
              headers: { "content-type": "application/json" },
              credentials: "include",
              body: JSON.stringify(command)
            };
            const res = await window.fetch(this.path, requestOptions);
            if (res.status === 200) {
              const commandOutput = await res.json();
              if (commandOutput.status) {
                return commandOutput.response;
              } else {
                throw new Error(commandOutput.error ? commandOutput.error : commandOutput.message);
              }
            }
            if (res.status === 201) {
              return await res.text();
            }
            throw new Error(`status code ${res.status}`);
          };
          this.path = path;
        }
      };
      commands = new Commands();
    }
  });

  // node_modules/@minima-global/mds-api/lib/data.ts
  var data_exports = {};
  __export(data_exports, {
    Data: () => Data,
    database: () => database
  });
  var Data, database;
  var init_data = __esm({
    "node_modules/@minima-global/mds-api/lib/data.ts"() {
      Data = class {
        constructor(path = "./mds/data") {
          this.path = path;
        }
        async executeSQL(sql) {
          if (window.executeSQL === void 0) {
            return await this._windowExecuteSQL(sql);
          } else {
            return await Promise.resolve(this._runnableExecuteSQL(sql));
          }
        }
        async _windowExecuteSQL(sql) {
          const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ sql })
          };
          const res = await window.fetch(this.path, requestOptions);
          if (res.ok) {
            return await res.json();
          }
          throw new Error(`status code ${res.status}`);
        }
        _runnableExecuteSQL(sql) {
          return JSON.parse(window.executeSQL(sql));
        }
      };
      database = new Data();
    }
  });

  // node_modules/@minima-global/mds-api/lib/event.ts
  var event_exports = {};
  __export(event_exports, {
    EventType: () => EventType,
    nodeEvent: () => nodeEvent,
    ws: () => ws
  });
  var ws, nodeEvent, EventType;
  var init_event = __esm({
    "node_modules/@minima-global/mds-api/lib/event.ts"() {
      ws = window.location === void 0 ? void 0 : new WebSocket(`ws://${window.location.hostname}:8091`);
      nodeEvent = window.nodeEvent === void 0 ? void 0 : JSON.parse(window.nodeEvent);
      EventType = /* @__PURE__ */ ((EventType2) => {
        EventType2[EventType2["NEWBLOCK"] = 0] = "NEWBLOCK";
        EventType2[EventType2["NEWBALANCE"] = 1] = "NEWBALANCE";
        EventType2[EventType2["MAXIMA"] = 2] = "MAXIMA";
        EventType2[EventType2["MINING"] = 3] = "MINING";
        return EventType2;
      })(EventType || {});
    }
  });

  // node_modules/@minima-global/mds-api/lib/notification.ts
  var notification_exports = {};
  __export(notification_exports, {
    pushNotification: () => pushNotification
  });
  var pushNotification;
  var init_notification = __esm({
    "node_modules/@minima-global/mds-api/lib/notification.ts"() {
      pushNotification = function(notification) {
        window.pushNotification === void 0 ? void 0 : window.pushNotification(notification);
      };
    }
  });

  // node_modules/@minima-global/mds-api/lib/types.ts
  var types_exports = {};
  var init_types = __esm({
    "node_modules/@minima-global/mds-api/lib/types.ts"() {
    }
  });

  // node_modules/@minima-global/mds-api/index.js
  var require_mds_api = __commonJS({
    "node_modules/@minima-global/mds-api/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar((init_command(), __toCommonJS(command_exports)), exports);
      __exportStar((init_data(), __toCommonJS(data_exports)), exports);
      __exportStar((init_event(), __toCommonJS(event_exports)), exports);
      __exportStar((init_notification(), __toCommonJS(notification_exports)), exports);
      __exportStar((init_types(), __toCommonJS(types_exports)), exports);
    }
  });

  // src/main.js
  var import_mds_api = __toESM(require_mds_api());
  import_mds_api.commands.balance().then((res) => console.log(res));
})();
