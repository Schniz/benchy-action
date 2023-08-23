"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value2) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key2] = value2;
var __export = (target, all7) => {
  for (var name in all7)
    __defProp(target, name, { get: all7[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key2 of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key2) && key2 !== except)
        __defProp(to2, key2, { get: () => from2[key2], enumerable: !(desc = __getOwnPropDesc(from2, key2)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value2) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value2);
  return value2;
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Function.mjs
var isFunction = (input) => typeof input === "function";
var dual = function(arity, body) {
  if (typeof arity === "function") {
    return function() {
      if (arity(arguments)) {
        return body.apply(this, arguments);
      }
      return (self) => body(self, ...arguments);
    };
  }
  switch (arity) {
    case 0:
      return body;
    case 1:
      return function(a) {
        if (arguments.length >= 1) {
          return body(a);
        }
        return function() {
          return body(a);
        };
      };
    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self) {
          return body(self, a);
        };
      };
    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self) {
          return body(self, a, b);
        };
      };
    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self) {
          return body(self, a, b, c);
        };
      };
    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self) {
          return body(self, a, b, c, d);
        };
      };
    default:
      return function() {
        if (arguments.length >= arity) {
          return body.apply(this, arguments);
        }
        const args = arguments;
        return function(self) {
          return body(self, ...args);
        };
      };
  }
};
var identity = (a) => a;
var constant = (value2) => () => value2;
var constTrue = /* @__PURE__ */ constant(true);
var constFalse = /* @__PURE__ */ constant(false);
var constUndefined = /* @__PURE__ */ constant(void 0);
var constVoid = constUndefined;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Equivalence.mjs
var make = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
var mapInput = /* @__PURE__ */ dual(2, (self, f) => make((x, y) => self(f(x), f(y))));
var array = (item) => make((self, that) => {
  if (self.length !== that.length) {
    return false;
  }
  for (let i = 0; i < self.length; i++) {
    const isEq = item(self[i], that[i]);
    if (!isEq) {
      return false;
    }
  }
  return true;
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Order.mjs
var make2 = (compare) => (self, that) => self === that ? 0 : compare(self, that);
var number = /* @__PURE__ */ make2((self, that) => self < that ? -1 : 1);
var reverse = (O) => make2((self, that) => O(that, self));
var mapInput2 = /* @__PURE__ */ dual(2, (self, f) => make2((b1, b2) => self(f(b1), f(b2))));
var all = (collection) => {
  return make2((x, y) => {
    const len = Math.min(x.length, y.length);
    let collectionLength = 0;
    for (const O of collection) {
      if (collectionLength >= len) {
        break;
      }
      const o = O(x[collectionLength], y[collectionLength]);
      if (o !== 0) {
        return o;
      }
      collectionLength++;
    }
    return 0;
  });
};
var tuple = (...elements) => all(elements);
var greaterThan = (O) => dual(2, (self, that) => O(self, that) === 1);
var max = (O) => dual(2, (self, that) => self === that || O(self, that) > -1 ? self : that);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Predicate.mjs
var isString = (input) => typeof input === "string";
var isNumber = (input) => typeof input === "number";
var isBoolean = (input) => typeof input === "boolean";
var isBigint = (input) => typeof input === "bigint";
var isSymbol = (input) => typeof input === "symbol";
var isFunction2 = isFunction;
var isUndefined = (input) => input === void 0;
var isNull = (input) => input === null;
var isNever = (_) => false;
var isObject = (input) => typeof input === "object" && input != null || isFunction2(input);
var isNullable = (input) => input === null || input === void 0;
var isNotNullable = (input) => input !== null && input !== void 0;
var isDate = (input) => input instanceof Date;
var isIterable = (input) => isObject(input) && Symbol.iterator in input;
var isRecord = (input) => isObject(input) && !Array.isArray(input);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Boolean.mjs
var not = (self) => !self;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/DeterministicRandom.mjs
var defaultIncHi = 335903614;
var defaultIncLo = 4150755663;
var MUL_HI = 1481765933 >>> 0;
var MUL_LO = 1284865837 >>> 0;
var BIT_53 = 9007199254740992;
var BIT_27 = 134217728;
var PCGRandom = class {
  constructor(seedHi, seedLo, incHi, incLo) {
    if (isNullable(seedLo) && isNullable(seedHi)) {
      seedLo = Math.random() * 4294967295 >>> 0;
      seedHi = 0;
    } else if (isNullable(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNullable(incLo) && isNullable(incHi)) {
      incLo = this._state ? this._state[3] : defaultIncLo;
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNullable(incLo)) {
      incLo = incHi;
      incHi = 0;
    }
    this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
    this._next();
    add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
    this._next();
    return this;
  }
  /**
   * Returns a copy of the internal state of this random number generator as a
   * JavaScript Array.
   *
   * @category getters
   * @since 1.0.0
   */
  getState() {
    return [this._state[0], this._state[1], this._state[2], this._state[3]];
  }
  /**
   * Restore state previously retrieved using `getState()`.
   *
   * @since 1.0.0
   */
  setState(state) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 1.0.0
   */
  integer(max5) {
    if (!max5) {
      return this._next();
    }
    max5 = max5 >>> 0;
    if ((max5 & max5 - 1) === 0) {
      return this._next() & max5 - 1;
    }
    let num = 0;
    const skew = (-max5 >>> 0) % max5 >>> 0;
    for (num = this._next(); num < skew; num = this._next()) {
    }
    return num % max5;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 1.0.0
   */
  number() {
    const hi = (this._next() & 67108863) * 1;
    const lo = (this._next() & 134217727) * 1;
    return (hi * BIT_27 + lo) / BIT_53;
  }
  /** @internal */
  _next() {
    const oldHi = this._state[0] >>> 0;
    const oldLo = this._state[1] >>> 0;
    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let xsHi = oldHi >>> 18;
    let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = (-rot >>> 0 & 31) >>> 0;
    return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
  }
};
function mul64(out, aHi, aLo, bHi, bLo) {
  let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
  let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
  let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
  let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
  c0 = c0 << 16 >>> 0;
  lo = lo + c0 >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  c1 = c1 << 16 >>> 0;
  lo = lo + c1 >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  hi = hi + Math.imul(aLo, bHi) >>> 0;
  hi = hi + Math.imul(aHi, bLo) >>> 0;
  out[0] = hi;
  out[1] = lo;
}
function add64(out, aHi, aLo, bHi, bLo) {
  let hi = aHi + bHi >>> 0;
  const lo = aLo + bLo >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = hi + 1 | 0;
  }
  out[0] = hi;
  out[1] = lo;
}

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Global.mjs
var globalStoreId = /* @__PURE__ */ Symbol.for("@effect/data/Global/globalStoreId");
if (!(globalStoreId in globalThis)) {
  ;
  globalThis[globalStoreId] = /* @__PURE__ */ new Map();
}
var globalStore = globalThis[globalStoreId];
var globalValue = (id, compute) => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Hash.mjs
var randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/data/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
var pcgr = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/data/Hash/pcgr"), () => new PCGRandom());
var symbol = /* @__PURE__ */ Symbol.for("@effect/data/Hash");
var hash = (self) => {
  switch (typeof self) {
    case "number": {
      return number2(self);
    }
    case "bigint": {
      return string(self.toString(10));
    }
    case "boolean": {
      return string(String(self));
    }
    case "symbol": {
      return string(String(self));
    }
    case "string": {
      return string(self);
    }
    case "undefined": {
      return string("undefined");
    }
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      }
      if (isHash(self)) {
        return self[symbol]();
      } else {
        return random(self);
      }
    }
    default: {
      throw new Error("Bug in Equal.hash");
    }
  }
};
var random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number2(pcgr.integer(Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
var combine = (b) => (self) => self * 53 ^ b;
var optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
var isHash = (u) => typeof u === "object" && u !== null && symbol in u;
var number2 = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(n);
};
var string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
var structureKeys = (o, keys3) => {
  let h = 12289;
  for (let i = 0; i < keys3.length; i++) {
    h ^= combine(hash(o[keys3[i]]))(string(keys3[i]));
  }
  return optimize(h);
};
var structure = (o) => structureKeys(o, Object.keys(o));
var array2 = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = combine(hash(arr[i]))(h);
  }
  return optimize(h);
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Equal.mjs
var symbol2 = /* @__PURE__ */ Symbol.for("@effect/data/Equal");
function equals() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if ((selfType === "object" || selfType === "function") && self !== null && that !== null) {
    if (isEqual(self) && isEqual(that)) {
      return hash(self) === hash(that) && self[symbol2](that);
    }
  }
  return false;
}
var isEqual = (u) => typeof u === "object" && u !== null && symbol2 in u;
var equivalence = () => (self, that) => hash(self) === hash(that) && equals(self, that);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Effect.mjs
var EffectTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Effect");
var effectVariance = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Pipeable.mjs
var pipeArguments = (self, args) => {
  switch (args.length) {
    case 1:
      return args[0](self);
    case 2:
      return args[1](args[0](self));
    case 3:
      return args[2](args[1](args[0](self)));
    case 4:
      return args[3](args[2](args[1](args[0](self))));
    case 5:
      return args[4](args[3](args[2](args[1](args[0](self)))));
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
    case 8:
      return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
    case 9:
      return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args.length; i < len; i++) {
        ret = args[i](ret);
      }
      return ret;
    }
  }
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Option.mjs
var _a;
var _b;
var TypeId = /* @__PURE__ */ Symbol.for("@effect/data/Option");
var Some = class {
  [(_a = EffectTypeId, symbol2)](that) {
    return isOption(that) && isSome(that) && equals(that.i0, this.i0);
  }
  [symbol]() {
    return hash(this.i0);
  }
  toString() {
    return `Some(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      value: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  get [TypeId]() {
    return {
      _A: (_) => _
    };
  }
  get value() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Some";
    this._id = TypeId;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a] = effectVariance;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var None = class {
  constructor() {
    this._tag = "None";
    this._id = TypeId;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_b] = effectVariance;
  }
  [(_b = EffectTypeId, symbol2)](that) {
    return isOption(that) && isNone(that);
  }
  [symbol]() {
    return hash(this._tag);
  }
  toString() {
    return `None()`;
  }
  toJSON() {
    return {
      _tag: this._tag
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  get [TypeId]() {
    return {
      _A: (_) => _
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isOption = (input) => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "None" || input["_tag"] === "Some") && isEqual(input);
var isNone = (fa) => fa._tag === "None";
var isSome = (fa) => fa._tag === "Some";
var none = /* @__PURE__ */ new None();
var some = (a) => new Some(a);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Either.mjs
var _a2;
var _b2;
var TypeId2 = /* @__PURE__ */ Symbol.for("@effect/data/Either");
var Right = class {
  [(_a2 = EffectTypeId, symbol2)](that) {
    return isEither(that) && isRight(that) && equals(that.i0, this.i0);
  }
  [symbol]() {
    return hash(this.i0);
  }
  get right() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Right";
    this._id = TypeId2;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a2] = effectVariance;
  }
  get [TypeId2]() {
    return {
      _E: (_) => _,
      _A: (_) => _
    };
  }
  toString() {
    return `right(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      right: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var Left = class {
  [(_b2 = EffectTypeId, symbol2)](that) {
    return isEither(that) && isLeft(that) && equals(that.i0, this.i0);
  }
  [symbol]() {
    return hash(this.i0);
  }
  get [TypeId2]() {
    return {
      _E: (_) => _,
      _A: (_) => _
    };
  }
  get left() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Left";
    this._id = TypeId2;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_b2] = effectVariance;
  }
  toString() {
    return `left(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      left: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isEither = (input) => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "Left" || input["_tag"] === "Right") && isEqual(input);
var isLeft = (ma) => ma._tag === "Left";
var isRight = (ma) => ma._tag === "Right";
var left = (e) => new Left(e);
var right = (a) => new Right(a);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Either.mjs
var TypeId3 = /* @__PURE__ */ Symbol.for("@effect/data/Either");
var right2 = right;
var left2 = left;
var isEither2 = (input) => isObject(input) && "_id" in input && input["_id"] === TypeId3;
var isLeft2 = isLeft;
var isRight2 = isRight;
var match = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft2(self) ? onLeft(self.left) : onRight(self.right));
var merge = /* @__PURE__ */ match({
  onLeft: identity,
  onRight: identity
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Number.mjs
var Order = number;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Option.mjs
var TypeId4 = /* @__PURE__ */ Symbol.for("@effect/data/Option");
var none2 = () => none;
var some2 = some;
var isOption2 = (input) => isObject(input) && "_id" in input && input["_id"] === TypeId4;
var isNone2 = isNone;
var isSome2 = isSome;
var match2 = /* @__PURE__ */ dual(2, (self, {
  onNone,
  onSome
}) => isNone2(self) ? onNone() : onSome(self.value));
var getOrElse = /* @__PURE__ */ dual(2, (self, onNone) => isNone2(self) ? onNone() : self.value);
var orElse = /* @__PURE__ */ dual(2, (self, that) => isNone2(self) ? that() : self);
var fromNullable = (nullableValue) => nullableValue == null ? none2() : some2(nullableValue);
var getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
var getOrThrowWith = /* @__PURE__ */ dual(2, (self, onNone) => {
  if (isSome2(self)) {
    return self.value;
  }
  throw onNone();
});
var getOrThrow = /* @__PURE__ */ getOrThrowWith(() => new Error("getOrThrow called on a None"));
var map = /* @__PURE__ */ dual(2, (self, f) => isNone2(self) ? none2() : some2(f(self.value)));
var flatMap = /* @__PURE__ */ dual(2, (self, f) => isNone2(self) ? none2() : f(self.value));
var flatten = /* @__PURE__ */ flatMap(identity);
var containsWith = (isEquivalent) => dual(2, (self, a) => isNone2(self) ? false : isEquivalent(self.value, a));
var _equivalence = /* @__PURE__ */ equivalence();
var contains = /* @__PURE__ */ containsWith(_equivalence);

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/ReadonlyArray.mjs
var isNonEmptyArray = (self) => self.length > 0;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/ReadonlyArray.mjs
var makeBy = (n, f) => {
  const max5 = Math.max(1, Math.floor(n));
  const out = [f(0)];
  for (let i = 1; i < max5; i++) {
    out.push(f(i));
  }
  return out;
};
var fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
var prepend = /* @__PURE__ */ dual(2, (self, head6) => [head6, ...self]);
var append = /* @__PURE__ */ dual(2, (self, last2) => [...self, last2]);
var isEmptyArray = (self) => self.length === 0;
var isEmptyReadonlyArray = isEmptyArray;
var isNonEmptyArray2 = isNonEmptyArray;
var isNonEmptyReadonlyArray = isNonEmptyArray;
var isOutOfBound = (i, as4) => i < 0 || i >= as4.length;
var get = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  return isOutOfBound(i, self) ? none2() : some2(self[i]);
});
var unsafeGet = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
var head = /* @__PURE__ */ get(0);
var headNonEmpty = /* @__PURE__ */ unsafeGet(0);
var last = (self) => isNonEmptyReadonlyArray(self) ? some2(lastNonEmpty(self)) : none2();
var lastNonEmpty = (self) => self[self.length - 1];
var tailNonEmpty = (self) => self.slice(1);
var reverse2 = (self) => Array.from(self).reverse();
var sort = /* @__PURE__ */ dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O);
  return out;
});
var zip = /* @__PURE__ */ dual(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
var zipWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const as4 = fromIterable(self);
  const bs = fromIterable(that);
  return isNonEmptyReadonlyArray(as4) && isNonEmptyReadonlyArray(bs) ? zipNonEmptyWith(bs, f)(as4) : [];
});
var zipNonEmptyWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const cs = [f(headNonEmpty(self), headNonEmpty(that))];
  const len = Math.min(self.length, that.length);
  for (let i = 1; i < len; i++) {
    cs[i] = f(self[i], that[i]);
  }
  return cs;
});
var dedupeNonEmptyWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const out = [headNonEmpty(self)];
  const rest = tailNonEmpty(self);
  for (const a of rest) {
    if (out.every((o) => !isEquivalent(a, o))) {
      out.push(a);
    }
  }
  return out;
});
var empty = () => [];
var of = (a) => [a];
var map2 = /* @__PURE__ */ dual(2, (self, f) => self.map(f));
var mapNonEmpty = map2;
var flatMap2 = /* @__PURE__ */ dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    out.push(...f(self[i], i));
  }
  return out;
});
var flatten2 = /* @__PURE__ */ flatMap2(identity);
var filterMap = /* @__PURE__ */ dual(2, (self, f) => {
  const as4 = fromIterable(self);
  const out = [];
  for (let i = 0; i < as4.length; i++) {
    const o = f(as4[i], i);
    if (isSome2(o)) {
      out.push(o.value);
    }
  }
  return out;
});
var compact = /* @__PURE__ */ filterMap(identity);
var reduce = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable(self).reduce((b2, a, i) => f(b2, a, i), b));
var reduceRight = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable(self).reduceRight((b2, a, i) => f(b2, a, i), b));
var unfold = (b, f) => {
  const out = [];
  let next = b;
  let o;
  while (isSome2(o = f(next))) {
    const [a, b2] = o.value;
    out.push(a);
    next = b2;
  }
  return out;
};
var getEquivalence = array;
var dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const input = fromIterable(self);
  return isNonEmptyReadonlyArray(input) ? dedupeNonEmptyWith(isEquivalent)(input) : [];
});
var dedupe = /* @__PURE__ */ dedupeWith(/* @__PURE__ */ equivalence());
var join = /* @__PURE__ */ dual(2, (self, sep) => fromIterable(self).join(sep));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Context.mjs
var _a3;
var TagTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Context/Tag");
var TagImpl = class {
  [(_a3 = EffectTypeId, symbol2)](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  get [TagTypeId]() {
    return {
      _S: (_) => _,
      _I: (_) => _
    };
  }
  constructor(identifier) {
    this._tag = "Tag";
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a3] = effectVariance;
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 3;
    this.creationError = new Error();
    Error.stackTraceLimit = limit;
    if (typeof identifier !== "undefined") {
      this.i0 = identifier;
      return globalValue(identifier, () => this);
    }
  }
  get stack() {
    return this.creationError.stack;
  }
  toString() {
    return JSON.stringify(this);
  }
  toJSON() {
    return {
      _tag: "Tag",
      identifier: this.i0,
      stack: this.stack
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  of(self) {
    return self;
  }
  context(self) {
    return make3(this, self);
  }
};
var ContextTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Context");
var ContextImpl = class {
  [symbol2](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
  [symbol]() {
    return number2(this.unsafeMap.size);
  }
  constructor(unsafeMap) {
    this.unsafeMap = unsafeMap;
    this._id = ContextTypeId;
    this._S = (_) => _;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var serviceNotFoundError = (tag2) => {
  const error2 = new Error(`Service not found${tag2.i0 ? `: ${String(tag2.i0)}` : ""}`);
  if (tag2.stack) {
    const lines = tag2.stack.split("\n");
    if (lines.length > 2) {
      const afterAt = lines[3].match(/at (.*)/);
      if (afterAt) {
        error2.message = error2.message + ` (defined at ${afterAt[1]})`;
      }
    }
  }
  if (error2.stack) {
    const lines = error2.stack.split("\n");
    lines.splice(1, 3);
    error2.stack = lines.join("\n");
  }
  return error2;
};
var isContext = (u) => typeof u === "object" && u !== null && "_id" in u && u["_id"] === ContextTypeId;
var empty2 = () => new ContextImpl(/* @__PURE__ */ new Map());
var make3 = (tag2, service) => new ContextImpl(/* @__PURE__ */ new Map([[tag2, service]]));
var add = /* @__PURE__ */ dual(3, (self, tag2, service) => {
  const map14 = new Map(self.unsafeMap);
  map14.set(tag2, service);
  return new ContextImpl(map14);
});
var unsafeGet2 = /* @__PURE__ */ dual(2, (self, tag2) => {
  if (!self.unsafeMap.has(tag2)) {
    throw serviceNotFoundError(tag2);
  }
  return self.unsafeMap.get(tag2);
});
var get2 = unsafeGet2;
var getOption = /* @__PURE__ */ dual(2, (self, tag2) => {
  if (!self.unsafeMap.has(tag2)) {
    return none2();
  }
  return some2(self.unsafeMap.get(tag2));
});
var merge2 = /* @__PURE__ */ dual(2, (self, that) => {
  const map14 = new Map(self.unsafeMap);
  for (const [tag2, s] of that.unsafeMap) {
    map14.set(tag2, s);
  }
  return new ContextImpl(map14);
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Context.mjs
var Tag = (key2) => new TagImpl(key2);
var empty3 = empty2;
var make4 = make3;
var add2 = add;
var get3 = get2;
var unsafeGet3 = unsafeGet2;
var getOption2 = getOption;
var merge3 = merge2;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Data.mjs
var protoArr = /* @__PURE__ */ (() => {
  const proto6 = {
    [symbol]() {
      return array2(this);
    },
    [symbol2](that) {
      if (Array.isArray(that) && this.length === that.length) {
        return this.every((v, i) => equals(v, that[i]));
      } else {
        return false;
      }
    }
  };
  return Object.setPrototypeOf(proto6, Array.prototype);
})();
var protoStruct = /* @__PURE__ */ (() => {
  const proto6 = {
    [symbol]() {
      return structure(this);
    },
    [symbol2](that) {
      const selfKeys = Object.keys(this);
      const thatKeys = Object.keys(that);
      if (selfKeys.length !== thatKeys.length) {
        return false;
      }
      for (const key2 of selfKeys) {
        if (!(key2 in that && equals(this[key2], that[key2]))) {
          return false;
        }
      }
      return true;
    }
  };
  return Object.setPrototypeOf(proto6, Object.prototype);
})();
var struct = (as4) => unsafeStruct(Object.assign({}, as4));
var unsafeStruct = (as4) => Object.setPrototypeOf(as4, protoStruct);
var tuple2 = (...as4) => unsafeArray(as4);
var array3 = (as4) => unsafeArray(as4.slice(0));
var unsafeArray = (as4) => Object.setPrototypeOf(as4, protoArr);
var _case = () => (args) => args === void 0 ? struct({}) : struct(args);
var tagged = (tag2) => (
  // @ts-expect-error
  (args) => args === void 0 ? struct({
    _tag: tag2
  }) : struct({
    ...args,
    _tag: tag2
  })
);
var TaggedClass = (tag2) => {
  class Base extends Class {
    constructor() {
      super(...arguments);
      this._tag = tag2;
    }
  }
  return Base;
};
var Class = /* @__PURE__ */ (() => {
  class Base {
    constructor(args) {
      if (args) {
        Object.assign(this, args);
      }
    }
    [symbol]() {
      return structure(this);
    }
    [symbol2](that) {
      const selfKeys = Object.keys(this);
      const thatKeys = Object.keys(that);
      if (selfKeys.length !== thatKeys.length) {
        return false;
      }
      for (const key2 of selfKeys) {
        if (!(key2 in that && equals(this[key2], that[key2]))) {
          return false;
        }
      }
      return true;
    }
  }
  return Base;
})();
var taggedEnum = () => tagged;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Duration.mjs
var TypeId5 = /* @__PURE__ */ Symbol.for("@effect/data/Duration");
var bigint1e3 = /* @__PURE__ */ BigInt(1e3);
var bigint1e9 = /* @__PURE__ */ BigInt(1e9);
var DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos|micros|millis|seconds|minutes|hours|days|weeks)$/;
var decode = (input) => {
  if (isDuration(input)) {
    return input;
  } else if (isNumber(input)) {
    return millis(input);
  } else if (isBigint(input)) {
    return nanos(input);
  } else {
    DURATION_REGEX.lastIndex = 0;
    const match7 = DURATION_REGEX.exec(input);
    if (match7) {
      const [_, valueStr, unit3] = match7;
      const value2 = Number(valueStr);
      switch (unit3) {
        case "nanos":
          return nanos(BigInt(valueStr));
        case "micros":
          return micros(BigInt(valueStr));
        case "millis":
          return millis(value2);
        case "seconds":
          return seconds(value2);
        case "minutes":
          return minutes(value2);
        case "hours":
          return hours(value2);
        case "days":
          return days(value2);
        case "weeks":
          return weeks(value2);
      }
    }
  }
  throw new Error("Invalid duration input");
};
var zeroValue = {
  _tag: "Millis",
  millis: 0
};
var infinityValue = {
  _tag: "Infinity"
};
var DurationImpl = class {
  constructor(input) {
    this._id = TypeId5;
    if (isNumber(input)) {
      if (isNaN(input) || input < 0) {
        this.value = zeroValue;
      } else if (!Number.isFinite(input)) {
        this.value = infinityValue;
      } else if (!Number.isInteger(input)) {
        this.value = {
          _tag: "Nanos",
          nanos: BigInt(Math.round(input * 1e6))
        };
      } else {
        this.value = {
          _tag: "Millis",
          millis: input
        };
      }
    } else if (input < BigInt(0)) {
      this.value = zeroValue;
    } else {
      this.value = {
        _tag: "Nanos",
        nanos: input
      };
    }
  }
  [symbol]() {
    return structure(this.value);
  }
  [symbol2](that) {
    return isDuration(that) && equals2(this, that);
  }
  toString() {
    switch (this.value._tag) {
      case "Millis":
        return `Duration("${this.value.millis} millis")`;
      case "Nanos":
        return `Duration("${this.value.nanos} nanos")`;
      case "Infinity":
        return "Duration(Infinity)";
    }
  }
  toJSON() {
    if (this.value._tag === "Nanos") {
      return {
        _tag: "Duration",
        value: {
          _tag: "Nanos",
          hrtime: toHrTime(this)
        }
      };
    }
    return {
      _tag: "Duration",
      value: this.value
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isDuration = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId5;
var zero = /* @__PURE__ */ new DurationImpl(0);
var nanos = (nanos2) => new DurationImpl(nanos2);
var micros = (micros2) => new DurationImpl(micros2 * bigint1e3);
var millis = (millis2) => new DurationImpl(millis2);
var seconds = (seconds2) => new DurationImpl(seconds2 * 1e3);
var minutes = (minutes2) => new DurationImpl(minutes2 * 6e4);
var hours = (hours2) => new DurationImpl(hours2 * 36e5);
var days = (days2) => new DurationImpl(days2 * 864e5);
var weeks = (weeks2) => new DurationImpl(weeks2 * 6048e5);
var toMillis = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return Infinity;
    case "Nanos":
      return Number(_self.value.nanos) / 1e6;
    case "Millis":
      return _self.value.millis;
  }
};
var toHrTime = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return [Infinity, 0];
    case "Nanos":
      return [Number(_self.value.nanos / bigint1e9), Number(_self.value.nanos % bigint1e9)];
    case "Millis":
      return [Math.floor(_self.value.millis / 1e3), Math.round(_self.value.millis % 1e3 * 1e6)];
  }
};
var matchWith = /* @__PURE__ */ dual(3, (self, that, options) => {
  const _self = decode(self);
  const _that = decode(that);
  if (_self.value._tag === "Infinity" || _that.value._tag === "Infinity") {
    return options.onMillis(toMillis(_self), toMillis(_that));
  } else if (_self.value._tag === "Nanos" || _that.value._tag === "Nanos") {
    const selfNanos = _self.value._tag === "Nanos" ? _self.value.nanos : BigInt(Math.round(_self.value.millis * 1e6));
    const thatNanos = _that.value._tag === "Nanos" ? _that.value.nanos : BigInt(Math.round(_that.value.millis * 1e6));
    return options.onNanos(selfNanos, thatNanos);
  }
  return options.onMillis(_self.value.millis, _that.value.millis);
});
var Equivalence = (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 === that2,
  onNanos: (self2, that2) => self2 === that2
});
var greaterThanOrEqualTo2 = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 >= that2,
  onNanos: (self2, that2) => self2 >= that2
}));
var equals2 = /* @__PURE__ */ dual(2, (self, that) => Equivalence(decode(self), decode(that)));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashMap/config.mjs
var SIZE = 5;
var BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashMap/bitwise.mjs
function popcount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function hashFragment(shift2, h) {
  return h >>> shift2 & MASK;
}
function toBitmap(x) {
  return 1 << x;
}
function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashMap/array.mjs
function arrayUpdate(mutate3, at, v, arr) {
  let out = arr;
  if (!mutate3) {
    const len = arr.length;
    out = new Array(len);
    for (let i = 0; i < len; ++i)
      out[i] = arr[i];
  }
  out[at] = v;
  return out;
}
function arraySpliceOut(mutate3, at, arr) {
  const newLen = arr.length - 1;
  let i = 0;
  let g = 0;
  let out = arr;
  if (mutate3) {
    i = g = at;
  } else {
    out = new Array(newLen);
    while (i < at)
      out[g++] = arr[i++];
  }
  ;
  ++i;
  while (i <= newLen)
    out[g++] = arr[i++];
  if (mutate3) {
    out.length = newLen;
  }
  return out;
}
function arraySpliceIn(mutate3, at, v, arr) {
  const len = arr.length;
  if (mutate3) {
    let i2 = len;
    while (i2 >= at)
      arr[i2--] = arr[i2];
    arr[at] = v;
    return arr;
  }
  let i = 0, g = 0;
  const out = new Array(len + 1);
  while (i < at)
    out[g++] = arr[i++];
  out[at] = v;
  while (i < len)
    out[++g] = arr[i++];
  return out;
}

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Stack.mjs
var Stack = class {
  constructor(value2, previous) {
    this.value = value2;
    this.previous = previous;
  }
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashMap/node.mjs
var EmptyNode = class _EmptyNode {
  constructor() {
    this._tag = "EmptyNode";
  }
  modify(edit, _shift, f, hash2, key2, size8) {
    const v = f(none2());
    if (isNone2(v))
      return new _EmptyNode();
    ++size8.value;
    return new LeafNode(edit, hash2, key2, v);
  }
};
function isEmptyNode(a) {
  return a instanceof EmptyNode;
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
var LeafNode = class _LeafNode {
  constructor(edit, hash2, key2, value2) {
    this.edit = edit;
    this.hash = hash2;
    this.key = key2;
    this.value = value2;
    this._tag = "LeafNode";
  }
  modify(edit, shift2, f, hash2, key2, size8) {
    if (equals(key2, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value)
        return this;
      else if (isNone2(v2)) {
        ;
        --size8.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new _LeafNode(edit, hash2, key2, v2);
    }
    const v = f(none2());
    if (isNone2(v))
      return this;
    ++size8.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new _LeafNode(edit, hash2, key2, v));
  }
};
var CollisionNode = class _CollisionNode {
  constructor(edit, hash2, children) {
    this.edit = edit;
    this.hash = hash2;
    this.children = children;
    this._tag = "CollisionNode";
  }
  modify(edit, shift2, f, hash2, key2, size8) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key2, size8);
      if (list === this.children)
        return this;
      return list.length > 1 ? new _CollisionNode(edit, this.hash, list) : list[0];
    }
    const v = f(none2());
    if (isNone2(v))
      return this;
    ++size8.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new LeafNode(edit, hash2, key2, v));
  }
  updateCollisionList(mutate3, edit, hash2, list, f, key2, size8) {
    const len = list.length;
    for (let i = 0; i < len; ++i) {
      const child = list[i];
      if ("key" in child && equals(key2, child.key)) {
        const value2 = child.value;
        const newValue2 = f(value2);
        if (newValue2 === value2)
          return list;
        if (isNone2(newValue2)) {
          ;
          --size8.value;
          return arraySpliceOut(mutate3, i, list);
        }
        return arrayUpdate(mutate3, i, new LeafNode(edit, hash2, key2, newValue2), list);
      }
    }
    const newValue = f(none2());
    if (isNone2(newValue))
      return list;
    ++size8.value;
    return arrayUpdate(mutate3, len, new LeafNode(edit, hash2, key2, newValue), list);
  }
};
var IndexedNode = class _IndexedNode {
  constructor(edit, mask, children) {
    this.edit = edit;
    this.mask = mask;
    this.children = children;
    this._tag = "IndexedNode";
  }
  modify(edit, shift2, f, hash2, key2, size8) {
    const mask = this.mask;
    const children = this.children;
    const frag = hashFragment(shift2, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists3 = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists3) {
      const _newChild = new EmptyNode().modify(edit, shift2 + SIZE, f, hash2, key2, size8);
      if (!_newChild)
        return this;
      return children.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new _IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children));
    }
    const current = children[indx];
    const child = current.modify(edit, shift2 + SIZE, f, hash2, key2, size8);
    if (current === child)
      return this;
    let bitmap = mask;
    let newChildren;
    if (isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap)
        return new EmptyNode();
      if (children.length <= 2 && isLeafNode(children[indx ^ 1])) {
        return children[indx ^ 1];
      }
      newChildren = arraySpliceOut(canEdit, indx, children);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return new _IndexedNode(edit, bitmap, newChildren);
  }
};
var ArrayNode = class _ArrayNode {
  constructor(edit, size8, children) {
    this.edit = edit;
    this.size = size8;
    this.children = children;
    this._tag = "ArrayNode";
  }
  modify(edit, shift2, f, hash2, key2, size8) {
    let count = this.size;
    const children = this.children;
    const frag = hashFragment(shift2, hash2);
    const child = children[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift2 + SIZE, f, hash2, key2, size8);
    if (child === newChild)
      return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ;
      ++count;
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      ;
      --count;
      if (count <= MIN_ARRAY_NODE) {
        return pack(edit, count, frag, children);
      }
      newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    }
    if (canEdit) {
      this.size = count;
      this.children = newChildren;
      return this;
    }
    return new _ArrayNode(edit, count, newChildren);
  }
};
function pack(edit, count, removed, elements) {
  const children = new Array(count - 1);
  let g = 0;
  let bitmap = 0;
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];
      if (elem && !isEmptyNode(elem)) {
        children[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }
  return new IndexedNode(edit, bitmap, children);
}
function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count = 0;
  for (let i = 0; bit; ++i) {
    if (bit & 1)
      arr[i] = subNodes[count++];
    bit >>>= 1;
  }
  arr[frag] = child;
  return new ArrayNode(edit, count + 1, arr);
}
function mergeLeavesInner(edit, shift2, h1, n1, h2, n2) {
  if (h1 === h2)
    return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = hashFragment(shift2, h1);
  const subH2 = hashFragment(shift2, h2);
  if (subH1 === subH2) {
    return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
  } else {
    const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children);
  }
}
function mergeLeaves(edit, shift2, h1, n1, h2, n2) {
  let stack = void 0;
  let currentShift = shift2;
  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
    if (typeof res === "function") {
      stack = new Stack(res, stack);
      currentShift = currentShift + SIZE;
    } else {
      let final = res;
      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }
      return final;
    }
  }
}

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashMap.mjs
var HashMapTypeId = /* @__PURE__ */ Symbol.for("@effect/data/HashMap");
var HashMapImpl = class {
  constructor(_editable, _edit, _root, _size) {
    this._editable = _editable;
    this._edit = _edit;
    this._root = _root;
    this._size = _size;
    this._id = HashMapTypeId;
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  }
  [symbol]() {
    let hash2 = hash("HashMap");
    for (const item of this) {
      hash2 ^= combine(hash(item[0]))(hash(item[1]));
    }
    return hash2;
  }
  [symbol2](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = getHash(item[0], hash(item[0]))(that);
        if (isNone2(elem)) {
          return false;
        } else {
          if (!equals(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  toString() {
    return `HashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashMap",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var HashMapIterator = class _HashMapIterator {
  constructor(map14, f) {
    this.map = map14;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone2(this.v)) {
      return {
        done: true,
        value: void 0
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new _HashMapIterator(this.map, this.f);
  }
};
var applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none2();
var visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome2(node.value)) {
        return some2({
          value: f(node.key, node.value.value),
          cont
        });
      }
      return applyCont(cont);
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children = node.children;
      return visitLazyChildren(children.length, children, 0, f, cont);
    }
    default: {
      return applyCont(cont);
    }
  }
};
var visitLazyChildren = (len, children, i, f, cont) => {
  while (i < len) {
    const child = children[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }
  return applyCont(cont);
};
var empty4 = () => new HashMapImpl(false, 0, new EmptyNode(), 0);
var make5 = (...entries) => fromIterable2(entries);
var fromIterable2 = (entries) => {
  const map14 = beginMutation(empty4());
  for (const entry of entries) {
    set(entry[0], entry[1])(map14);
  }
  return endMutation(map14);
};
var isHashMap = (u) => isObject(u) && "_id" in u && u["_id"] === HashMapTypeId;
var isEmpty = (self) => self && isEmptyNode(self._root);
var get4 = /* @__PURE__ */ dual(2, (self, key2) => getHash(self, key2, hash(key2)));
var getHash = /* @__PURE__ */ dual(3, (self, key2, hash2) => {
  let node = self._root;
  let shift2 = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals(key2, node.key) ? node.value : none2();
      }
      case "CollisionNode": {
        if (hash2 === node.hash) {
          const children = node.children;
          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if ("key" in child && equals(key2, child.key)) {
              return child.value;
            }
          }
        }
        return none2();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift2, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift2 += SIZE;
          break;
        }
        return none2();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift2, hash2)];
        if (node) {
          shift2 += SIZE;
          break;
        }
        return none2();
      }
      default:
        return none2();
    }
  }
});
var has = /* @__PURE__ */ dual(2, (self, key2) => isSome2(getHash(self, key2, hash(key2))));
var set = /* @__PURE__ */ dual(3, (self, key2, value2) => modifyAt(self, key2, () => some2(value2)));
var setTree = /* @__PURE__ */ dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    ;
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : new HashMapImpl(self._editable, self._edit, newRoot, newSize);
});
var keys = (self) => new HashMapIterator(self, (key2) => key2);
var size = (self) => self._size;
var beginMutation = (self) => new HashMapImpl(true, self._edit + 1, self._root, self._size);
var endMutation = (self) => {
  ;
  self._editable = false;
  return self;
};
var modifyAt = /* @__PURE__ */ dual(3, (self, key2, f) => modifyHash(self, key2, hash(key2), f));
var modifyHash = /* @__PURE__ */ dual(4, (self, key2, hash2, f) => {
  const size8 = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash2, key2, size8);
  return setTree(newRoot, size8.value)(self);
});
var remove = /* @__PURE__ */ dual(2, (self, key2) => modifyAt(self, key2, none2));
var map3 = /* @__PURE__ */ dual(2, (self, f) => reduce2(self, empty4(), (map14, value2, key2) => set(map14, key2, f(value2, key2))));
var forEach = /* @__PURE__ */ dual(2, (self, f) => reduce2(self, void 0, (_, value2, key2) => f(value2, key2)));
var reduce2 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  const root = self._root;
  if (root._tag === "LeafNode") {
    return isSome2(root.value) ? f(zero2, root.value.value, root.key) : zero2;
  }
  if (root._tag === "EmptyNode") {
    return zero2;
  }
  const toVisit = [root.children];
  let children;
  while (children = toVisit.pop()) {
    for (let i = 0, len = children.length; i < len; ) {
      const child = children[i++];
      if (child && !isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (isSome2(child.value)) {
            zero2 = f(zero2, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero2;
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/HashSet.mjs
var HashSetTypeId = /* @__PURE__ */ Symbol.for("@effect/data/HashSet");
var HashSetImpl = class {
  constructor(_keyMap) {
    this._keyMap = _keyMap;
    this._id = HashSetTypeId;
  }
  [Symbol.iterator]() {
    return keys(this._keyMap);
  }
  [symbol]() {
    return combine(hash(this._keyMap))(hash("HashSet"));
  }
  [symbol2](that) {
    if (isHashSet(that)) {
      return size(this._keyMap) === size(that._keyMap) && equals(this._keyMap, that._keyMap);
    }
    return false;
  }
  toString() {
    return `HashSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isHashSet = (u) => isObject(u) && "_id" in u && u["_id"] === HashSetTypeId;
var empty5 = () => new HashSetImpl(empty4());
var fromIterable3 = (elements) => {
  const set6 = beginMutation2(empty5());
  for (const value2 of elements) {
    add3(set6, value2);
  }
  return endMutation2(set6);
};
var make6 = (...elements) => {
  const set6 = beginMutation2(empty5());
  for (const value2 of elements) {
    add3(set6, value2);
  }
  return endMutation2(set6);
};
var has2 = /* @__PURE__ */ dual(2, (self, value2) => has(self._keyMap, value2));
var size2 = (self) => size(self._keyMap);
var beginMutation2 = (self) => new HashSetImpl(beginMutation(self._keyMap));
var endMutation2 = (self) => {
  ;
  self._keyMap._editable = false;
  return self;
};
var mutate = /* @__PURE__ */ dual(2, (self, f) => {
  const transient = beginMutation2(self);
  f(transient);
  return endMutation2(transient);
});
var add3 = /* @__PURE__ */ dual(2, (self, value2) => self._keyMap._editable ? (set(value2, true)(self._keyMap), self) : new HashSetImpl(set(value2, true)(self._keyMap)));
var remove2 = /* @__PURE__ */ dual(2, (self, value2) => self._keyMap._editable ? (remove(value2)(self._keyMap), self) : new HashSetImpl(remove(value2)(self._keyMap)));
var difference = /* @__PURE__ */ dual(2, (self, that) => mutate(self, (set6) => {
  for (const value2 of that) {
    remove2(set6, value2);
  }
}));
var union = /* @__PURE__ */ dual(2, (self, that) => mutate(empty5(), (set6) => {
  forEach2(self, (value2) => add3(set6, value2));
  for (const value2 of that) {
    add3(set6, value2);
  }
}));
var forEach2 = /* @__PURE__ */ dual(2, (self, f) => forEach(self._keyMap, (_, k) => f(k)));
var reduce3 = /* @__PURE__ */ dual(3, (self, zero2, f) => reduce2(self._keyMap, zero2, (z, _, a) => f(z, a)));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/HashMap.mjs
var empty6 = empty4;
var make7 = make5;
var fromIterable4 = fromIterable2;
var isEmpty2 = isEmpty;
var get5 = get4;
var set2 = set;
var keys2 = keys;
var size3 = size;
var remove3 = remove;
var map4 = map3;
var forEach3 = forEach;
var reduce4 = reduce2;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/MutableRef.mjs
var TypeId6 = /* @__PURE__ */ Symbol.for("@effect/data/MutableRef");
var MutableRefImpl = class {
  constructor(current) {
    this.current = current;
    this._T = (_) => _;
    this._id = TypeId6;
  }
  toString() {
    return `MutableRef(${String(this.current)})`;
  }
  toJSON() {
    return {
      _tag: "MutableRef",
      current: this.current
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make8 = (value2) => new MutableRefImpl(value2);
var compareAndSet = /* @__PURE__ */ dual(3, (self, oldValue, newValue) => {
  if (equals(oldValue, self.current)) {
    self.current = newValue;
    return true;
  }
  return false;
});
var get6 = (self) => self.current;
var incrementAndGet = (self) => updateAndGet(self, (n) => n + 1);
var set3 = /* @__PURE__ */ dual(2, (self, value2) => {
  self.current = value2;
  return self;
});
var setAndGet = /* @__PURE__ */ dual(2, (self, value2) => {
  self.current = value2;
  return self.current;
});
var update = /* @__PURE__ */ dual(2, (self, f) => set3(self, f(get6(self))));
var updateAndGet = /* @__PURE__ */ dual(2, (self, f) => setAndGet(self, f(get6(self))));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/MutableHashMap.mjs
var TypeId7 = /* @__PURE__ */ Symbol.for("@effect/data/MutableHashMap");
var MutableHashMapImpl = class {
  constructor() {
    this._id = TypeId7;
    this.backingMap = make8(empty6());
  }
  [Symbol.iterator]() {
    return this.backingMap.current[Symbol.iterator]();
  }
  toString() {
    return `MutableHashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableHashMap",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var empty7 = () => new MutableHashMapImpl();
var get7 = /* @__PURE__ */ dual(2, (self, key2) => get5(self.backingMap.current, key2));
var has3 = /* @__PURE__ */ dual(2, (self, key2) => isSome2(get7(self, key2)));
var remove4 = /* @__PURE__ */ dual(2, (self, key2) => {
  update(self.backingMap, remove3(key2));
  return self;
});
var set4 = /* @__PURE__ */ dual(3, (self, key2, value2) => {
  update(self.backingMap, set2(key2, value2));
  return self;
});
var size4 = (self) => size3(get6(self.backingMap));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Chunk.mjs
var TypeId8 = /* @__PURE__ */ Symbol.for("@effect/data/Chunk");
function copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
var emptyArray = [];
var getEquivalence2 = (isEquivalent) => make((self, that) => toReadonlyArray(self).every((value2, i) => isEquivalent(value2, unsafeGet5(that, i))));
var _equivalence2 = /* @__PURE__ */ getEquivalence2(equals);
var ChunkImpl = class {
  constructor(backing) {
    this.backing = backing;
    this._id = TypeId8;
    switch (backing._tag) {
      case "IEmpty": {
        this.length = 0;
        this.depth = 0;
        this.left = this;
        this.right = this;
        break;
      }
      case "IConcat": {
        this.length = backing.left.length + backing.right.length;
        this.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
        this.left = backing.left;
        this.right = backing.right;
        break;
      }
      case "IArray": {
        this.length = backing.array.length;
        this.depth = 0;
        this.left = _empty;
        this.right = _empty;
        break;
      }
      case "ISingleton": {
        this.length = 1;
        this.depth = 0;
        this.left = _empty;
        this.right = _empty;
        break;
      }
      case "ISlice": {
        this.length = backing.length;
        this.depth = backing.chunk.depth + 1;
        this.left = _empty;
        this.right = _empty;
        break;
      }
    }
  }
  toString() {
    return `Chunk(${toReadonlyArray(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "Chunk",
      values: toReadonlyArray(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol2](that) {
    return isChunk(that) && _equivalence2(this, that);
  }
  [symbol]() {
    return array2(toReadonlyArray(this));
  }
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]();
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]();
      }
      default: {
        return toReadonlyArray(this)[Symbol.iterator]();
      }
    }
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isChunk = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId8;
var _empty = /* @__PURE__ */ new ChunkImpl({
  _tag: "IEmpty"
});
var empty8 = () => _empty;
var of2 = (a) => new ChunkImpl({
  _tag: "ISingleton",
  a
});
var fromIterable5 = (self) => isChunk(self) ? self : new ChunkImpl({
  _tag: "IArray",
  array: fromIterable(self)
});
var copyToArray = (self, array7, initial) => {
  switch (self.backing._tag) {
    case "IArray": {
      copy(self.backing.array, 0, array7, initial, self.length);
      break;
    }
    case "IConcat": {
      copyToArray(self.left, array7, initial);
      copyToArray(self.right, array7, initial + self.left.length);
      break;
    }
    case "ISingleton": {
      array7[initial] = self.backing.a;
      break;
    }
    case "ISlice": {
      let i = 0;
      let j = initial;
      while (i < self.length) {
        array7[j] = unsafeGet5(self, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
var toReadonlyArray = (self) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray;
    }
    case "IArray": {
      return self.backing.array;
    }
    default: {
      const arr = new Array(self.length);
      copyToArray(self, arr, 0);
      self.backing = {
        _tag: "IArray",
        array: arr
      };
      self.left = _empty;
      self.right = _empty;
      self.depth = 0;
      return arr;
    }
  }
};
var reverse3 = (self) => {
  switch (self.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self;
    case "IArray": {
      return new ChunkImpl({
        _tag: "IArray",
        array: reverse2(self.backing.array)
      });
    }
    case "IConcat": {
      return new ChunkImpl({
        _tag: "IConcat",
        left: reverse3(self.backing.right),
        right: reverse3(self.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse2(toReadonlyArray(self)));
  }
};
var get8 = /* @__PURE__ */ dual(2, (self, index2) => index2 < 0 || index2 >= self.length ? none2() : some2(unsafeGet5(self, index2)));
var unsafeFromArray = (self) => new ChunkImpl({
  _tag: "IArray",
  array: self
});
var unsafeGet5 = /* @__PURE__ */ dual(2, (self, index2) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`);
    }
    case "ISingleton": {
      if (index2 !== 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.a;
    }
    case "IArray": {
      if (index2 >= self.length || index2 < 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.array[index2];
    }
    case "IConcat": {
      return index2 < self.left.length ? unsafeGet5(self.left, index2) : unsafeGet5(self.right, index2 - self.left.length);
    }
    case "ISlice": {
      return unsafeGet5(self.backing.chunk, index2 + self.backing.offset);
    }
  }
});
var append2 = /* @__PURE__ */ dual(2, (self, a) => appendAllNonEmpty(self, of2(a)));
var prepend2 = /* @__PURE__ */ dual(2, (self, elem) => appendAllNonEmpty(of2(elem), self));
var take = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return _empty;
  } else if (n >= self.length) {
    return self;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          length: n,
          offset: self.backing.offset
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return new ChunkImpl({
            _tag: "IConcat",
            left: self.left,
            right: take(self.right, n - self.left.length)
          });
        }
        return take(self.left, n);
      }
      default: {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self,
          offset: 0,
          length: n
        });
      }
    }
  }
});
var drop = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _empty;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          offset: self.backing.offset + n,
          length: self.backing.length - n
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return drop(self.right, n - self.left.length);
        }
        return new ChunkImpl({
          _tag: "IConcat",
          left: drop(self.left, n),
          right: self.right
        });
      }
      default: {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self,
          offset: n,
          length: self.length - n
        });
      }
    }
  }
});
var appendAll = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.backing._tag === "IEmpty") {
    return that;
  }
  if (that.backing._tag === "IEmpty") {
    return self;
  }
  const diff11 = that.depth - self.depth;
  if (Math.abs(diff11) <= 1) {
    return new ChunkImpl({
      _tag: "IConcat",
      left: self,
      right: that
    });
  } else if (diff11 < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = appendAll(self.right, that);
      return new ChunkImpl({
        _tag: "IConcat",
        left: self.left,
        right: nr
      });
    } else {
      const nrr = appendAll(self.right.right, that);
      if (nrr.depth === self.depth - 3) {
        const nr = new ChunkImpl({
          _tag: "IConcat",
          left: self.right.left,
          right: nrr
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: self.left,
          right: nr
        });
      } else {
        const nl = new ChunkImpl({
          _tag: "IConcat",
          left: self.left,
          right: self.right.left
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nl,
          right: nrr
        });
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = appendAll(self, that.left);
      return new ChunkImpl({
        _tag: "IConcat",
        left: nl,
        right: that.right
      });
    } else {
      const nll = appendAll(self, that.left.left);
      if (nll.depth === that.depth - 3) {
        const nl = new ChunkImpl({
          _tag: "IConcat",
          left: nll,
          right: that.left.right
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nr = new ChunkImpl({
          _tag: "IConcat",
          left: that.left.right,
          right: that.right
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nll,
          right: nr
        });
      }
    }
  }
});
var appendAllNonEmpty = /* @__PURE__ */ dual(2, (self, that) => appendAll(self, that));
var isEmpty3 = (self) => self.length === 0;
var isNonEmpty = (self) => self.length > 0;
var head2 = /* @__PURE__ */ get8(0);
var unsafeHead = (self) => unsafeGet5(self, 0);
var headNonEmpty2 = unsafeHead;
var unsafeLast = (self) => unsafeGet5(self, self.length - 1);
var map5 = /* @__PURE__ */ dual(2, (self, f) => self.backing._tag === "ISingleton" ? of2(f(self.backing.a, 0)) : unsafeFromArray(map2((a, i) => f(a, i))(toReadonlyArray(self))));
var sort2 = /* @__PURE__ */ dual(2, (self, O) => unsafeFromArray(sort(toReadonlyArray(self), O)));
var splitAt = /* @__PURE__ */ dual(2, (self, n) => [take(self, n), drop(self, n)]);
var splitWhere = /* @__PURE__ */ dual(2, (self, predicate) => {
  let i = 0;
  for (const a of toReadonlyArray(self)) {
    if (predicate(a)) {
      break;
    } else {
      i++;
    }
  }
  return splitAt(self, i);
});
var tailNonEmpty2 = (self) => drop(self, 1);
var dedupe2 = (self) => unsafeFromArray(dedupe(toReadonlyArray(self)));

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/MutableList.mjs
var TypeId9 = /* @__PURE__ */ Symbol.for("@effect/data/MutableList");
var MutableListImpl = class {
  constructor() {
    this._id = TypeId9;
    this.head = void 0;
    this.tail = void 0;
    this._length = 0;
  }
  [Symbol.iterator]() {
    let done7 = false;
    let head6 = this.head;
    return {
      next() {
        if (done7) {
          return this.return();
        }
        if (head6 == null) {
          done7 = true;
          return this.return();
        }
        const value2 = head6.value;
        head6 = head6.next;
        return {
          done: done7,
          value: value2
        };
      },
      return(value2) {
        if (!done7) {
          done7 = true;
        }
        return {
          done: true,
          value: value2
        };
      }
    };
  }
  toString() {
    return `MutableList(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableList",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var LinkedListNode = class {
  constructor(value2) {
    this.value = value2;
    this.removed = false;
    this.prev = void 0;
    this.next = void 0;
  }
};
var empty9 = () => new MutableListImpl();
var isEmpty4 = (self) => length(self) === 0;
var length = (self) => self._length;
var append3 = /* @__PURE__ */ dual(2, (self, value2) => {
  const node = new LinkedListNode(value2);
  if (self.head === void 0) {
    self.head = node;
  }
  if (self.tail === void 0) {
    self.tail = node;
  } else {
    self.tail.next = node;
    node.prev = self.tail;
    self.tail = node;
  }
  ;
  self._length += 1;
  return self;
});
var shift = (self) => {
  const head6 = self.head;
  if (head6 !== void 0) {
    remove6(self, head6);
    return head6.value;
  }
  return void 0;
};
var remove6 = (self, node) => {
  if (node.removed) {
    return;
  }
  node.removed = true;
  if (node.prev !== void 0 && node.next !== void 0) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  } else if (node.prev !== void 0) {
    self.tail = node.prev;
    node.prev.next = void 0;
  } else if (node.next !== void 0) {
    self.head = node.next;
    node.next.prev = void 0;
  } else {
    self.tail = void 0;
    self.head = void 0;
  }
  if (self._length > 0) {
    ;
    self._length -= 1;
  }
};

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/MutableQueue.mjs
var TypeId10 = /* @__PURE__ */ Symbol.for("@effect/data/MutableQueue");
var EmptyMutableQueue = /* @__PURE__ */ Symbol.for("@effect/data/mutable/MutableQueue/Empty");
var MutableQueueImpl = class {
  constructor(capacity = void 0) {
    this.capacity = capacity;
    this._tag = "Bounded";
    this._id = TypeId10;
    this.queue = empty9();
  }
  [Symbol.iterator]() {
    return Array.from(this.queue)[Symbol.iterator]();
  }
  toString() {
    return `MutableQueue(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableQueue",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var unbounded = () => new MutableQueueImpl();
var offer = /* @__PURE__ */ dual(2, (self, value2) => {
  const queueLength = length(self.queue);
  if (self.capacity !== void 0 && queueLength === self.capacity) {
    return false;
  }
  append3(value2)(self.queue);
  return true;
});
var poll = /* @__PURE__ */ dual(2, (self, def) => {
  if (isEmpty4(self.queue)) {
    return def;
  }
  return shift(self.queue);
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Differ/ContextPatch.mjs
var ContextPatchTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ/ContextPatch");
function variance(a) {
  return a;
}
var Empty = class {
  constructor() {
    this._tag = "Empty";
    this._Input = variance;
    this._Output = variance;
    this._id = ContextPatchTypeId;
  }
  [symbol]() {
    return string(`ContextPatch(Empty)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
};
var AndThen = class {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this._tag = "AndThen";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [symbol]() {
    return string(`ContextPatch(AndThen)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.first, that.first) && equals(this.second, that.second);
  }
};
var AddService = class {
  constructor(tag2, service) {
    this.tag = tag2;
    this.service = service;
    this._tag = "AddService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [symbol]() {
    return string(`ContextPatch(AddService)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.tag, that.tag) && equals(this.service, that.service);
  }
};
var RemoveService = class {
  constructor(tag2) {
    this.tag = tag2;
    this._tag = "RemoveService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [symbol]() {
    return string(`ContextPatch(RemoveService)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.tag, that.tag);
  }
};
var UpdateService = class {
  constructor(tag2, update6) {
    this.tag = tag2;
    this.update = update6;
    this._tag = "UpdateService";
    this._id = ContextPatchTypeId;
    this._Input = variance;
    this._Output = variance;
  }
  [symbol]() {
    return string(`ContextPatch(AndThen)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.tag, that.tag) && equals(this.update, that.update);
  }
};
var empty10 = () => new Empty();
var diff = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch11 = empty10();
  for (const [tag2, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag2)) {
      const old = missingServices.get(tag2);
      missingServices.delete(tag2);
      if (!equals(old, newService)) {
        patch11 = combine2(new UpdateService(tag2, () => newService))(patch11);
      }
    } else {
      missingServices.delete(tag2);
      patch11 = combine2(new AddService(tag2, newService))(patch11);
    }
  }
  for (const [tag2] of missingServices.entries()) {
    patch11 = combine2(new RemoveService(tag2))(patch11);
  }
  return patch11;
};
var combine2 = /* @__PURE__ */ dual(2, (self, that) => new AndThen(self, that));
var patch = /* @__PURE__ */ dual(2, (self, context4) => {
  let wasServiceUpdated = false;
  let patches = of2(self);
  const updatedContext = new Map(context4.unsafeMap);
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    const tail = tailNonEmpty2(patches);
    switch (head6._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AddService": {
        updatedContext.set(head6.tag, head6.service);
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend2(prepend2(tail, head6.second), head6.first);
        break;
      }
      case "RemoveService": {
        updatedContext.delete(head6.tag);
        patches = tail;
        break;
      }
      case "UpdateService": {
        updatedContext.set(head6.tag, head6.update(updatedContext.get(head6.tag)));
        wasServiceUpdated = true;
        patches = tail;
        break;
      }
    }
  }
  if (!wasServiceUpdated) {
    return new ContextImpl(updatedContext);
  }
  const map14 = /* @__PURE__ */ new Map();
  for (const [tag2] of context4.unsafeMap) {
    if (updatedContext.has(tag2)) {
      map14.set(tag2, updatedContext.get(tag2));
      updatedContext.delete(tag2);
    }
  }
  for (const [tag2, s] of updatedContext) {
    map14.set(tag2, s);
  }
  return new ContextImpl(map14);
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Differ/ContextPatch.mjs
var empty11 = empty10;
var diff2 = diff;
var combine3 = combine2;
var patch2 = patch;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/HashSet.mjs
var empty12 = empty5;
var fromIterable6 = fromIterable3;
var make9 = make6;
var has4 = has2;
var size5 = size2;
var add4 = add3;
var remove7 = remove2;
var difference2 = difference;
var union4 = union;
var reduce5 = reduce3;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Differ/HashSetPatch.mjs
var HashSetPatchTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ/HashSetPatch");
function variance2(a) {
  return a;
}
var Empty2 = class {
  constructor() {
    this._tag = "Empty";
    this._Value = variance2;
    this._id = HashSetPatchTypeId;
  }
  [symbol]() {
    return string(`HashSetPatch(Empty)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
};
var AndThen2 = class {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this._tag = "AndThen";
    this._Value = variance2;
    this._id = HashSetPatchTypeId;
  }
  [symbol]() {
    return string(`HashSetPatch(AndThen)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.first, that.first) && equals(this.second, that.second);
  }
};
var Add = class {
  constructor(value2) {
    this.value = value2;
    this._tag = "Add";
    this._Value = variance2;
    this._id = HashSetPatchTypeId;
  }
  [symbol]() {
    return string(`HashSetPatch(Add)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.value, that.value);
  }
};
var Remove = class {
  constructor(value2) {
    this.value = value2;
    this._tag = "Remove";
    this._Value = variance2;
    this._id = HashSetPatchTypeId;
  }
  [symbol]() {
    return string(`HashSetPatch(Remove)`);
  }
  [symbol2](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals(this.value, that.value);
  }
};
var empty13 = () => new Empty2();
var diff3 = (oldValue, newValue) => {
  const [removed, patch11] = reduce5([oldValue, empty13()], ([set6, patch12], value2) => {
    if (has4(value2)(set6)) {
      return [remove7(value2)(set6), patch12];
    }
    return [set6, combine4(new Add(value2))(patch12)];
  })(newValue);
  return reduce5(patch11, (patch12, value2) => combine4(new Remove(value2))(patch12))(removed);
};
var combine4 = /* @__PURE__ */ dual(2, (self, that) => new AndThen2(self, that));
var patch3 = /* @__PURE__ */ dual(2, (self, oldValue) => {
  let set6 = oldValue;
  let patches = of2(self);
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    const tail = tailNonEmpty2(patches);
    switch (head6._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend2(head6.first)(prepend2(head6.second)(tail));
        break;
      }
      case "Add": {
        set6 = add4(head6.value)(set6);
        patches = tail;
        break;
      }
      case "Remove": {
        set6 = remove7(head6.value)(set6);
        patches = tail;
      }
    }
  }
  return set6;
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Differ/HashSetPatch.mjs
var empty14 = empty13;
var diff4 = diff3;
var combine5 = combine4;
var patch4 = patch3;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/internal/Differ.mjs
var DifferTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ");
var DifferImpl = class {
  constructor(params) {
    this._id = DifferTypeId;
    this._P = identity;
    this._V = identity;
    this.empty = params.empty;
    this.diff = params.diff;
    this.combine = params.combine;
    this.patch = params.patch;
  }
};
var make10 = (params) => new DifferImpl(params);
var environment = () => make10({
  empty: empty11(),
  combine: (first, second) => combine3(second)(first),
  diff: (oldValue, newValue) => diff2(oldValue, newValue),
  patch: (patch11, oldValue) => patch2(oldValue)(patch11)
});
var hashSet = () => make10({
  empty: empty14(),
  combine: (first, second) => combine5(second)(first),
  diff: (oldValue, newValue) => diff4(oldValue, newValue),
  patch: (patch11, oldValue) => patch4(oldValue)(patch11)
});
var update2 = () => updateWith((_, a) => a);
var updateWith = (f) => make10({
  empty: identity,
  combine: (first, second) => {
    if (first === identity) {
      return second;
    }
    if (second === identity) {
      return first;
    }
    return (a) => second(first(a));
  },
  diff: (oldValue, newValue) => {
    if (equals(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch11, oldValue) => f(oldValue, patch11(oldValue))
});

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/Differ.mjs
var diff5 = /* @__PURE__ */ dual(3, (self, oldValue, newValue) => self.diff(oldValue, newValue));
var combine6 = /* @__PURE__ */ dual(3, (self, first, second) => self.combine(first, second));
var patch5 = /* @__PURE__ */ dual(3, (self, patch11, oldValue) => self.patch(patch11, oldValue));
var make11 = make10;
var environment2 = environment;
var hashSet2 = hashSet;
var update3 = update2;

// node_modules/.pnpm/@effect+data@0.17.6/node_modules/@effect/data/mjs/List.mjs
var TypeId11 = /* @__PURE__ */ Symbol.for("@effect/data/List");
var toReadonlyArray2 = (self) => Array.from(self);
var getEquivalence3 = (isEquivalent) => mapInput(getEquivalence(isEquivalent), toReadonlyArray2);
var _equivalence3 = /* @__PURE__ */ getEquivalence3(equals);
var ConsImpl = class {
  constructor(head6, tail) {
    this.head = head6;
    this.tail = tail;
    this._tag = "Cons";
    this._id = TypeId11;
  }
  toString() {
    return `List.Cons(${toReadonlyArray2(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "List.Cons",
      values: toReadonlyArray2(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol2](that) {
    return isList(that) && this._tag === that._tag && _equivalence3(this, that);
  }
  [symbol]() {
    return array2(toReadonlyArray2(this));
  }
  [Symbol.iterator]() {
    let done7 = false;
    let self = this;
    return {
      next() {
        if (done7) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done7 = true;
          return this.return();
        }
        const value2 = self.head;
        self = self.tail;
        return {
          done: done7,
          value: value2
        };
      },
      return(value2) {
        if (!done7) {
          done7 = true;
        }
        return {
          done: true,
          value: value2
        };
      }
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var NilImpl = class {
  constructor() {
    this._tag = "Nil";
    this._id = TypeId11;
  }
  toString() {
    return `List.Nil`;
  }
  toJSON() {
    return {
      _tag: "List.Nil"
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol]() {
    return array2(toReadonlyArray2(this));
  }
  [symbol2](that) {
    return isList(that) && this._tag === that._tag;
  }
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: void 0
        };
      }
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isList = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId11;
var isNil = (self) => self._tag === "Nil";
var isCons = (self) => self._tag === "Cons";
var _Nil = /* @__PURE__ */ new NilImpl();
var nil = () => _Nil;
var cons = (head6, tail) => new ConsImpl(head6, tail);
var empty15 = nil;
var of3 = (value2) => new ConsImpl(value2, _Nil);
var appendAll2 = /* @__PURE__ */ dual(2, (self, that) => prependAll(that, self));
var prepend3 = /* @__PURE__ */ dual(2, (self, element) => cons(element, self));
var prependAll = /* @__PURE__ */ dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = new ConsImpl(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = new ConsImpl(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
var findFirst3 = /* @__PURE__ */ dual(2, (self, predicate) => {
  let these = self;
  while (!isNil(these)) {
    if (predicate(these.head)) {
      return some2(these.head);
    }
    these = these.tail;
  }
  return none2();
});
var head3 = (self) => isNil(self) ? none2() : some2(self.head);
var reduce6 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  let acc = zero2;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
var reverse4 = (self) => {
  let result = empty15();
  let these = self;
  while (!isNil(these)) {
    result = prepend3(result, these.head);
    these = these.tail;
  }
  return result;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberId.mjs
var _a4;
var _b3;
var _c;
var FiberIdSymbolKey = "@effect/io/Fiber/Id";
var FiberIdTypeId = /* @__PURE__ */ Symbol.for(FiberIdSymbolKey);
var OP_NONE = "None";
var OP_RUNTIME = "Runtime";
var OP_COMPOSITE = "Composite";
var None2 = class {
  constructor() {
    this[_a4] = FiberIdTypeId;
    this._tag = OP_NONE;
  }
  [(_a4 = FiberIdTypeId, symbol)]() {
    return combine(hash(this._tag))(hash(FiberIdSymbolKey));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
};
var Runtime = class {
  constructor(id, startTimeMillis) {
    this.id = id;
    this.startTimeMillis = startTimeMillis;
    this[_b3] = FiberIdTypeId;
    this._tag = OP_RUNTIME;
  }
  [(_b3 = FiberIdTypeId, symbol)]() {
    return combine(hash(this.startTimeMillis))(combine(hash(this.id))(combine(hash(this._tag))(hash(FiberIdSymbolKey))));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
};
var Composite = class {
  constructor(left3, right3) {
    this.left = left3;
    this.right = right3;
    this[_c] = FiberIdTypeId;
    this._tag = OP_COMPOSITE;
  }
  [(_c = FiberIdTypeId, symbol)]() {
    return combine(hash(this.right))(combine(hash(this.left))(combine(hash(this._tag))(hash(FiberIdSymbolKey))));
  }
  [symbol2](that) {
    return isFiberId(that) && that._tag === OP_COMPOSITE && equals(this.left, that.left) && equals(this.right, that.right);
  }
};
var none3 = /* @__PURE__ */ new None2();
var isFiberId = (self) => {
  return typeof self === "object" && self != null && FiberIdTypeId in self;
};
var combine7 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self._tag === OP_NONE) {
    return that;
  }
  if (that._tag === OP_NONE) {
    return self;
  }
  return new Composite(self, that);
});
var ids = (self) => {
  switch (self._tag) {
    case OP_NONE: {
      return empty12();
    }
    case OP_RUNTIME: {
      return make9(self.id);
    }
    case OP_COMPOSITE: {
      return union4(ids(self.right))(ids(self.left));
    }
  }
};
var _fiberCounter = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Fiber/Id/_fiberCounter"), () => make8(0));
var threadName = (self) => {
  const identifiers = Array.from(ids(self)).map((n) => `#${n}`).join(",");
  return identifiers;
};
var unsafeMake = () => {
  const id = get6(_fiberCounter);
  set3(id + 1)(_fiberCounter);
  return new Runtime(id, (/* @__PURE__ */ new Date()).getTime());
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Fiber/Id.mjs
var none4 = none3;
var combine8 = combine7;
var threadName2 = threadName;
var unsafeMake2 = unsafeMake;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/cause.mjs
var OP_DIE = "Die";
var OP_EMPTY = "Empty";
var OP_FAIL = "Fail";
var OP_INTERRUPT = "Interrupt";
var OP_ANNOTATED = "Annotated";
var OP_PARALLEL = "Parallel";
var OP_SEQUENTIAL = "Sequential";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/cause.mjs
var CauseSymbolKey = "@effect/io/Cause";
var CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
var variance3 = {
  _E: (_) => _
};
var proto = {
  [CauseTypeId]: variance3,
  [symbol]() {
    return combine(hash(flattenCause(this)))(hash(CauseSymbolKey));
  },
  [symbol2](that) {
    return isCause(that) && causeEquals(this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toJSON() {
    return {
      _tag: "Cause",
      errors: prettyErrors(this)
    };
  },
  toString() {
    return pretty(this);
  },
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
};
var empty16 = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ Object.create(proto);
  o._tag = OP_EMPTY;
  return o;
})();
var fail = (error2) => {
  const o = Object.create(proto);
  o._tag = OP_FAIL;
  o.error = error2;
  return o;
};
var die = (defect) => {
  const o = Object.create(proto);
  o._tag = OP_DIE;
  o.defect = defect;
  return o;
};
var interrupt = (fiberId3) => {
  const o = Object.create(proto);
  o._tag = OP_INTERRUPT;
  o.fiberId = fiberId3;
  return o;
};
var annotated = (cause3, annotation) => {
  const o = Object.create(proto);
  o._tag = OP_ANNOTATED;
  o.cause = cause3;
  o.annotation = annotation;
  return o;
};
var parallel = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_PARALLEL;
  o.left = left3;
  o.right = right3;
  return o;
};
var sequential = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_SEQUENTIAL;
  o.left = left3;
  o.right = right3;
  return o;
};
var isCause = (u) => typeof u === "object" && u != null && CauseTypeId in u;
var isEmptyType = (self) => self._tag === OP_EMPTY;
var isDieType = (self) => self._tag === OP_DIE;
var isEmpty5 = (self) => {
  if (self._tag === OP_EMPTY) {
    return true;
  }
  return reduce7(self, true, (acc, cause3) => {
    switch (cause3._tag) {
      case OP_EMPTY: {
        return some2(acc);
      }
      case OP_DIE:
      case OP_FAIL:
      case OP_INTERRUPT: {
        return some2(false);
      }
      default: {
        return none2();
      }
    }
  });
};
var isInterruptedOnly = (self) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self);
var failures = (self) => reverse3(reduce7(self, empty8(), (list, cause3) => cause3._tag === OP_FAIL ? some2(prepend2(cause3.error)(list)) : none2()));
var defects = (self) => reverse3(reduce7(self, empty8(), (list, cause3) => cause3._tag === OP_DIE ? some2(prepend2(cause3.defect)(list)) : none2()));
var interruptors = (self) => reduce7(self, empty12(), (set6, cause3) => cause3._tag === OP_INTERRUPT ? some2(add4(cause3.fiberId)(set6)) : none2());
var failureOption = (self) => find(self, (cause3) => cause3._tag === OP_FAIL ? some2(cause3.error) : none2());
var failureOrCause = (self) => {
  const option6 = failureOption(self);
  switch (option6._tag) {
    case "None": {
      return right2(self);
    }
    case "Some": {
      return left2(option6.value);
    }
  }
};
var keepDefects = (self) => match3(self, {
  onEmpty: none2(),
  onFail: () => none2(),
  onDie: (defect) => some2(die(defect)),
  onInterrupt: () => none2(),
  onAnnotated: (option6, annotation) => map((cause3) => annotated(cause3, annotation))(option6),
  onSequential: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(sequential(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  },
  onParallel: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(parallel(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  }
});
var keepDefectsAndElectFailures = (self) => match3(self, {
  onEmpty: none2(),
  onFail: (failure2) => some2(die(failure2)),
  onDie: (defect) => some2(die(defect)),
  onInterrupt: () => none2(),
  onAnnotated: (option6, annotation) => map((cause3) => annotated(cause3, annotation))(option6),
  onSequential: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(sequential(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  },
  onParallel: (left3, right3) => {
    if (isSome2(left3) && isSome2(right3)) {
      return some2(parallel(left3.value, right3.value));
    }
    if (isSome2(left3) && isNone2(right3)) {
      return some2(left3.value);
    }
    if (isNone2(left3) && isSome2(right3)) {
      return some2(right3.value);
    }
    return none2();
  }
});
var stripFailures = (self) => match3(self, {
  onEmpty: empty16,
  onFail: () => empty16,
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onAnnotated: (cause3, annotation) => isEmptyType(cause3) ? cause3 : annotated(cause3, annotation),
  onSequential: sequential,
  onParallel: parallel
});
var electFailures = (self) => match3(self, {
  onEmpty: empty16,
  onFail: (failure2) => die(failure2),
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onAnnotated: (cause3, annotation) => isEmptyType(cause3) ? cause3 : annotated(cause3, annotation),
  onSequential: (left3, right3) => sequential(left3, right3),
  onParallel: (left3, right3) => parallel(left3, right3)
});
var flatMap6 = /* @__PURE__ */ dual(2, (self, f) => match3(self, {
  onEmpty: empty16,
  onFail: (error2) => f(error2),
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId3) => interrupt(fiberId3),
  onAnnotated: (cause3, annotation) => annotated(cause3, annotation),
  onSequential: (left3, right3) => sequential(left3, right3),
  onParallel: (left3, right3) => parallel(left3, right3)
}));
var flatten3 = (self) => flatMap6(self, identity);
var causeEquals = (left3, right3) => {
  let leftStack = of2(left3);
  let rightStack = of2(right3);
  while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = reduce7([empty12(), empty8()], ([parallel3, sequential3], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return some2([union4(par2)(parallel3), appendAll(seq2)(sequential3)]);
    })(headNonEmpty2(leftStack));
    const [rightParallel, rightSequential] = reduce7([empty12(), empty8()], ([parallel3, sequential3], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return some2([union4(par2)(parallel3), appendAll(seq2)(sequential3)]);
    })(headNonEmpty2(rightStack));
    if (!equals(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
var flattenCause = (cause3) => {
  return flattenCauseLoop(of2(cause3), empty8());
};
var flattenCauseLoop = (causes, flattened) => {
  while (1) {
    const [parallel3, sequential3] = reduce([empty12(), empty8()], ([parallel4, sequential4], cause3) => {
      const [par2, seq2] = evaluateCause(cause3);
      return [union4(par2)(parallel4), appendAll(seq2)(sequential4)];
    })(causes);
    const updated = size5(parallel3) > 0 ? prepend2(parallel3)(flattened) : flattened;
    if (isEmpty3(sequential3)) {
      return reverse3(updated);
    }
    causes = sequential3;
    flattened = updated;
  }
  throw new Error("BUG: Cause.flattenCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
var find = /* @__PURE__ */ dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option6 = pf(item);
    switch (option6._tag) {
      case "None": {
        switch (item._tag) {
          case OP_SEQUENTIAL:
          case OP_PARALLEL: {
            stack.push(item.right);
            stack.push(item.left);
            break;
          }
          case OP_ANNOTATED: {
            stack.push(item.cause);
            break;
          }
        }
        break;
      }
      case "Some": {
        return option6;
      }
    }
  }
  return none2();
});
var evaluateCause = (self) => {
  let cause3 = self;
  const stack = [];
  let _parallel = empty12();
  let _sequential = empty8();
  while (cause3 !== void 0) {
    switch (cause3._tag) {
      case OP_EMPTY: {
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause3 = stack.pop();
        break;
      }
      case OP_FAIL: {
        if (stack.length === 0) {
          return [add4(cause3.error)(_parallel), _sequential];
        }
        _parallel = add4(cause3.error)(_parallel);
        cause3 = stack.pop();
        break;
      }
      case OP_DIE: {
        if (stack.length === 0) {
          return [add4(cause3.defect)(_parallel), _sequential];
        }
        _parallel = add4(cause3.defect)(_parallel);
        cause3 = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        if (stack.length === 0) {
          return [add4(cause3.fiberId)(_parallel), _sequential];
        }
        _parallel = add4(cause3.fiberId)(_parallel);
        cause3 = stack.pop();
        break;
      }
      case OP_ANNOTATED: {
        cause3 = cause3.cause;
        break;
      }
      case OP_SEQUENTIAL: {
        switch (cause3.left._tag) {
          case OP_EMPTY: {
            cause3 = cause3.right;
            break;
          }
          case OP_SEQUENTIAL: {
            cause3 = sequential(cause3.left.left, sequential(cause3.left.right, cause3.right));
            break;
          }
          case OP_PARALLEL: {
            cause3 = parallel(sequential(cause3.left.left, cause3.right), sequential(cause3.left.right, cause3.right));
            break;
          }
          case OP_ANNOTATED: {
            cause3 = sequential(cause3.left.cause, cause3.right);
            break;
          }
          default: {
            _sequential = prepend2(cause3.right)(_sequential);
            cause3 = cause3.left;
            break;
          }
        }
        break;
      }
      case OP_PARALLEL: {
        stack.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
    }
  }
  throw new Error("BUG: Cause.evaluateCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
var IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  annotatedCase: (_, value2) => value2,
  sequentialCase: (_, left3, right3) => left3 && right3,
  parallelCase: (_, left3, right3) => left3 && right3
};
var OP_SEQUENTIAL_CASE = "SequentialCase";
var OP_PARALLEL_CASE = "ParallelCase";
var OP_ANNOTATED_CASE = "AnnotatedCase";
var match3 = /* @__PURE__ */ dual(2, (self, {
  onAnnotated,
  onDie,
  onEmpty,
  onFail,
  onInterrupt: onInterrupt3,
  onParallel,
  onSequential
}) => {
  return reduceWithContext(self, void 0, {
    emptyCase: () => onEmpty,
    failCase: (_, error2) => onFail(error2),
    dieCase: (_, defect) => onDie(defect),
    interruptCase: (_, fiberId3) => onInterrupt3(fiberId3),
    annotatedCase: (_, value2, annotation) => onAnnotated(value2, annotation),
    sequentialCase: (_, left3, right3) => onSequential(left3, right3),
    parallelCase: (_, left3, right3) => onParallel(left3, right3)
  });
});
var reduce7 = /* @__PURE__ */ dual(3, (self, zero2, pf) => {
  let accumulator = zero2;
  let cause3 = self;
  const causes = [];
  while (cause3 !== void 0) {
    const option6 = pf(accumulator, cause3);
    accumulator = isSome2(option6) ? option6.value : accumulator;
    switch (cause3._tag) {
      case OP_SEQUENTIAL: {
        causes.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
      case OP_PARALLEL: {
        causes.push(cause3.right);
        cause3 = cause3.left;
        break;
      }
      case OP_ANNOTATED: {
        cause3 = cause3.cause;
        break;
      }
      default: {
        cause3 = void 0;
        break;
      }
    }
    if (cause3 === void 0 && causes.length > 0) {
      cause3 = causes.pop();
    }
  }
  return accumulator;
});
var reduceWithContext = /* @__PURE__ */ dual(3, (self, context4, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause3 = input.pop();
    switch (cause3._tag) {
      case OP_EMPTY: {
        output.push(right2(reducer.emptyCase(context4)));
        break;
      }
      case OP_FAIL: {
        output.push(right2(reducer.failCase(context4, cause3.error)));
        break;
      }
      case OP_DIE: {
        output.push(right2(reducer.dieCase(context4, cause3.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right2(reducer.interruptCase(context4, cause3.fiberId)));
        break;
      }
      case OP_ANNOTATED: {
        input.push(cause3.cause);
        output.push(left2({
          _tag: OP_ANNOTATED_CASE,
          annotation: cause3.annotation
        }));
        break;
      }
      case OP_SEQUENTIAL: {
        input.push(cause3.right);
        input.push(cause3.left);
        output.push(left2({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL: {
        input.push(cause3.right);
        input.push(cause3.left);
        output.push(left2({
          _tag: OP_PARALLEL_CASE
        }));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either5 = output.pop();
    switch (either5._tag) {
      case "Left": {
        switch (either5.left._tag) {
          case OP_SEQUENTIAL_CASE: {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value2 = reducer.sequentialCase(context4, left3, right3);
            accumulator.push(value2);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value2 = reducer.parallelCase(context4, left3, right3);
            accumulator.push(value2);
            break;
          }
          case OP_ANNOTATED_CASE: {
            const cause3 = accumulator.pop();
            const value2 = reducer.annotatedCase(context4, cause3, either5.left.annotation);
            accumulator.push(value2);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either5.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/io/issues");
  }
  return accumulator.pop();
});
var makeException = (proto6, tag2) => {
  const _tag = {
    value: tag2,
    enumerable: true
  };
  const protoWithToString = {
    ...proto6,
    toString() {
      return `${this._tag}: ${this.message}`;
    }
  };
  return (message) => Object.create(protoWithToString, {
    _tag,
    message: {
      value: message,
      enumerable: true
    }
  });
};
var RuntimeExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/RuntimeException");
var RuntimeException = /* @__PURE__ */ makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
var InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/InterruptedException");
var InterruptedException = /* @__PURE__ */ makeException({
  [InterruptedExceptionTypeId]: InterruptedExceptionTypeId
}, "InterruptedException");
var isInterruptedException = (u) => {
  return typeof u === "object" && u != null && InterruptedExceptionTypeId in u;
};
var IllegalArgumentExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/IllegalArgument");
var IllegalArgumentException = /* @__PURE__ */ makeException({
  [IllegalArgumentExceptionTypeId]: IllegalArgumentExceptionTypeId
}, "IllegalArgumentException");
var NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/NoSuchElement");
var NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
var isNoSuchElementException = (u) => {
  return typeof u === "object" && u != null && NoSuchElementExceptionTypeId in u;
};
var InvalidHubCapacityExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/InvalidHubCapacityException");
var InvalidHubCapacityException = /* @__PURE__ */ makeException({
  [InvalidHubCapacityExceptionTypeId]: InvalidHubCapacityExceptionTypeId
}, "InvalidHubCapacityException");
var SpanAnnotationTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/SpanAnnotation");
var isSpanAnnotation = (u) => typeof u === "object" && u !== null && SpanAnnotationTypeId in u;
var makeSpanAnnotation = (span) => ({
  _tag: "SpanAnnotation",
  [SpanAnnotationTypeId]: SpanAnnotationTypeId,
  span
});
var renderToString = (u) => {
  if (typeof u === "object" && u != null && "toString" in u && typeof u["toString"] === "function" && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }
  if (typeof u === "string") {
    return `Error: ${u}`;
  }
  if (typeof u === "object" && u !== null) {
    if ("message" in u && typeof u["message"] === "string") {
      const raw = JSON.parse(JSON.stringify(u));
      const keys3 = new Set(Object.keys(raw));
      keys3.delete("name");
      keys3.delete("message");
      keys3.delete("_tag");
      if (keys3.size === 0) {
        return `${"name" in u && typeof u.name === "string" ? u.name : "Error"}${"_tag" in u && typeof u["_tag"] === "string" ? `(${u._tag})` : ``}: ${u.message}`;
      }
    }
  }
  return `Error: ${JSON.stringify(u)}`;
};
var defaultErrorToLines = (error2) => {
  if (error2 instanceof Error) {
    return [renderToString(error2), error2.stack?.split("\n").filter((_) => !_.startsWith("Error")).join("\n")];
  }
  return [renderToString(error2), void 0];
};
var filterStack = (stack) => {
  const lines = stack.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("EffectPrimitive") || lines[i].includes("Generator.next") || lines[i].includes("FiberRuntime")) {
      return out.join("\n");
    } else {
      out.push(lines[i]);
    }
  }
  return out.join("\n");
};
var pretty = (cause3) => {
  if (isInterruptedOnly(cause3)) {
    return "All fibers interrupted without errors.";
  }
  const final = prettyErrors(cause3).map((e) => {
    let message = e.message;
    if (e.stack) {
      message += `\r
${filterStack(e.stack)}`;
    }
    if (e.span) {
      let current = e.span;
      let i = 0;
      while (current && current._tag === "Span" && i < 10) {
        message += `\r
    at ${current.name}`;
        current = getOrUndefined(current.parent);
        i++;
      }
    }
    return message;
  }).join("\r\n\r\n");
  if (!final.includes("\r\n")) {
    return final;
  }
  return `\r
${final}\r
`;
};
var prettyErrors = (cause3) => reduceWithContext(cause3, void 0, {
  emptyCase: () => [],
  dieCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      stack: rendered[1],
      span: void 0
    }];
  },
  failCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      stack: rendered[1],
      span: void 0
    }];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r],
  annotatedCase: (_, v, annotation) => isSpanAnnotation(annotation) ? v.map((error2) => ({
    ...error2,
    span: error2.span ?? annotation.span
  })) : v
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Cause.mjs
var pretty2 = pretty;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/runtimeFlagsPatch.mjs
var BIT_MASK = 255;
var BIT_SHIFT = 8;
var active = (patch11) => patch11 & BIT_MASK;
var enabled = (patch11) => patch11 >> BIT_SHIFT & BIT_MASK;
var make13 = (active2, enabled2) => (active2 & BIT_MASK) + ((enabled2 & active2 & BIT_MASK) << BIT_SHIFT);
var empty17 = /* @__PURE__ */ make13(0, 0);
var enable = (flag) => make13(flag, flag);
var disable = (flag) => make13(flag, 0);
var exclude = /* @__PURE__ */ dual(2, (self, flag) => make13(active(self) & ~flag, enabled(self)));
var andThen = /* @__PURE__ */ dual(2, (self, that) => self | that);
var invert = (n) => ~n >>> 0 & BIT_MASK;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/runtimeFlags.mjs
var None3 = 0;
var Interruption = 1 << 0;
var OpSupervision = 1 << 1;
var RuntimeMetrics = 1 << 2;
var WindDown = 1 << 4;
var CooperativeYielding = 1 << 5;
var cooperativeYielding = (self) => isEnabled(self, CooperativeYielding);
var enable2 = /* @__PURE__ */ dual(2, (self, flag) => self | flag);
var interruptible = (self) => interruption(self) && !windDown(self);
var interruption = (self) => isEnabled(self, Interruption);
var isEnabled = /* @__PURE__ */ dual(2, (self, flag) => (self & flag) !== 0);
var make14 = (...flags) => flags.reduce((a, b) => a | b, 0);
var none5 = /* @__PURE__ */ make14(None3);
var runtimeMetrics = (self) => isEnabled(self, RuntimeMetrics);
var windDown = (self) => isEnabled(self, WindDown);
var diff6 = /* @__PURE__ */ dual(2, (self, that) => make13(self ^ that, that));
var patch6 = /* @__PURE__ */ dual(2, (self, patch11) => self & (invert(active(patch11)) | enabled(patch11)) | active(patch11) & enabled(patch11));
var differ = /* @__PURE__ */ make11({
  empty: empty17,
  diff: (oldValue, newValue) => diff6(oldValue, newValue),
  combine: (first, second) => andThen(second)(first),
  patch: (_patch, oldValue) => patch6(oldValue, _patch)
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Fiber/Runtime/Flags/Patch.mjs
var empty18 = empty17;
var enable3 = enable;
var disable2 = disable;
var exclude2 = exclude;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/blockedRequests.mjs
var _a5;
var _b4;
var _c2;
var empty19 = {
  _tag: "Empty"
};
var par = (self, that) => ({
  _tag: "Par",
  left: self,
  right: that
});
var seq = (self, that) => ({
  _tag: "Seq",
  left: self,
  right: that
});
var single = (dataSource, blockedRequest) => ({
  _tag: "Single",
  dataSource,
  blockedRequest
});
var flatten4 = (self) => {
  let current = of3(self);
  let updated = empty15();
  while (1) {
    const [parallel3, sequential3] = reduce6(current, [parallelCollectionEmpty(), empty15()], ([parallel4, sequential4], blockedRequest) => {
      const [par2, seq2] = step(blockedRequest);
      return [parallelCollectionCombine(parallel4, par2), appendAll2(sequential4, seq2)];
    });
    updated = merge4(updated, parallel3);
    if (isNil(sequential3)) {
      return reverse4(updated);
    }
    current = sequential3;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/query/issues");
};
var step = (requests) => {
  let current = requests;
  let parallel3 = parallelCollectionEmpty();
  let stack = empty15();
  let sequential3 = empty15();
  while (1) {
    switch (current._tag) {
      case "Empty": {
        if (isNil(stack)) {
          return [parallel3, sequential3];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
      case "Par": {
        stack = cons(current.right, stack);
        current = current.left;
        break;
      }
      case "Seq": {
        const left3 = current.left;
        const right3 = current.right;
        switch (left3._tag) {
          case "Empty": {
            current = right3;
            break;
          }
          case "Par": {
            const l = left3.left;
            const r = left3.right;
            current = par(seq(l, right3), seq(r, right3));
            break;
          }
          case "Seq": {
            const l = left3.left;
            const r = left3.right;
            current = seq(l, seq(r, right3));
            break;
          }
          case "Single": {
            current = left3;
            sequential3 = cons(right3, sequential3);
            break;
          }
        }
        break;
      }
      case "Single": {
        parallel3 = parallelCollectionCombine(parallel3, parallelCollectionMake(current.dataSource, current.blockedRequest));
        if (isNil(stack)) {
          return [parallel3, sequential3];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
    }
  }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/query/issues");
};
var merge4 = (sequential3, parallel3) => {
  if (isNil(sequential3)) {
    return of3(parallelCollectionToSequentialCollection(parallel3));
  }
  if (parallelCollectionIsEmpty(parallel3)) {
    return sequential3;
  }
  const seqHeadKeys = sequentialCollectionKeys(sequential3.head);
  const parKeys = parallelCollectionKeys(parallel3);
  if (seqHeadKeys.length === 1 && parKeys.length === 1 && equals(seqHeadKeys[0], parKeys[0])) {
    return cons(sequentialCollectionCombine(sequential3.head, parallelCollectionToSequentialCollection(parallel3)), sequential3.tail);
  }
  return cons(parallelCollectionToSequentialCollection(parallel3), sequential3);
};
var EntryTypeId = /* @__PURE__ */ Symbol.for("@effect/io/RequestBlock.Entry");
var EntryImpl = class {
  constructor(request2, result, listeners, ownerId, state) {
    this.request = request2;
    this.result = result;
    this.listeners = listeners;
    this.ownerId = ownerId;
    this.state = state;
    this[_a5] = blockedRequestVariance;
  }
};
_a5 = EntryTypeId;
var blockedRequestVariance = {
  _R: (_) => _
};
var makeEntry = (options) => new EntryImpl(options.request, options.result, options.listeners, options.ownerId, options.state);
var RequestBlockParallelTypeId = /* @__PURE__ */ Symbol.for("@effect/io/RequestBlockParallel");
var parallelVariance = {
  _R: (_) => _
};
var ParallelImpl = class {
  constructor(map14) {
    this.map = map14;
    this[_b4] = parallelVariance;
  }
};
_b4 = RequestBlockParallelTypeId;
var parallelCollectionEmpty = () => new ParallelImpl(empty6());
var parallelCollectionMake = (dataSource, blockedRequest) => new ParallelImpl(make7([dataSource, Array.of(blockedRequest)]));
var parallelCollectionCombine = (self, that) => new ParallelImpl(reduce4(self.map, that.map, (map14, value2, key2) => set2(map14, key2, match2(get5(map14, key2), {
  onNone: () => value2,
  onSome: (a) => [...a, ...value2]
}))));
var parallelCollectionIsEmpty = (self) => isEmpty2(self.map);
var parallelCollectionKeys = (self) => Array.from(keys2(self.map));
var parallelCollectionToSequentialCollection = (self) => sequentialCollectionMake(map4(self.map, (x) => Array.of(x)));
var SequentialCollectionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/RequestBlockSequential");
var sequentialVariance = {
  _R: (_) => _
};
var SequentialImpl = class {
  constructor(map14) {
    this.map = map14;
    this[_c2] = sequentialVariance;
  }
};
_c2 = SequentialCollectionTypeId;
var sequentialCollectionMake = (map14) => new SequentialImpl(map14);
var sequentialCollectionCombine = (self, that) => new SequentialImpl(reduce4(that.map, self.map, (map14, value2, key2) => set2(map14, key2, match2(get5(map14, key2), {
  onNone: () => [],
  onSome: (a) => [...a, ...value2]
}))));
var sequentialCollectionKeys = (self) => Array.from(keys2(self.map));
var sequentialCollectionToChunk = (self) => Array.from(self.map);

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/deferred.mjs
var OP_STATE_PENDING = "Pending";
var OP_STATE_DONE = "Done";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/deferred.mjs
var DeferredSymbolKey = "@effect/io/Deferred";
var DeferredTypeId = /* @__PURE__ */ Symbol.for(DeferredSymbolKey);
var deferredVariance = {
  _E: (_) => _,
  _A: (_) => _
};
var pending = (joiners) => {
  return {
    _tag: OP_STATE_PENDING,
    joiners
  };
};
var done = (effect) => {
  return {
    _tag: OP_STATE_DONE,
    effect
  };
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/effect.mjs
var OP_ASYNC = "Async";
var OP_COMMIT = "Commit";
var OP_FAILURE = "Failure";
var OP_ON_FAILURE = "OnFailure";
var OP_ON_SUCCESS = "OnSuccess";
var OP_ON_SUCCESS_AND_FAILURE = "OnSuccessAndFailure";
var OP_SUCCESS = "Success";
var OP_SYNC = "Sync";
var OP_TAG = "Tag";
var OP_UPDATE_RUNTIME_FLAGS = "UpdateRuntimeFlags";
var OP_WHILE = "While";
var OP_WITH_RUNTIME = "WithRuntime";
var OP_YIELD = "Yield";
var OP_REVERT_FLAGS = "RevertFlags";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Scheduler.mjs
var PriorityBuckets = class {
  constructor() {
    this.buckets = [];
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task, priority) {
    let bucket = void 0;
    let index2;
    for (index2 = 0; index2 < this.buckets.length; index2++) {
      if (this.buckets[index2][0] <= priority) {
        bucket = this.buckets[index2];
      } else {
        break;
      }
    }
    if (bucket) {
      bucket[1].push(task);
    } else {
      const newBuckets = [];
      for (let i = 0; i < index2; i++) {
        newBuckets.push(this.buckets[i]);
      }
      newBuckets.push([priority, [task]]);
      for (let i = index2; i < this.buckets.length; i++) {
        newBuckets.push(this.buckets[i]);
      }
      this.buckets = newBuckets;
    }
  }
};
var MixedScheduler = class {
  constructor(maxNextTickBeforeTimer) {
    this.maxNextTickBeforeTimer = maxNextTickBeforeTimer;
    this.running = false;
    this.tasks = new PriorityBuckets();
  }
  /**
   * @since 1.0.0
   */
  starveInternal(depth) {
    const tasks = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [_, toRun] of tasks) {
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    if (this.tasks.buckets.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  /**
   * @since 1.0.0
   */
  starve(depth = 0) {
    if (depth >= this.maxNextTickBeforeTimer) {
      setTimeout(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task, priority) {
    this.tasks.scheduleTask(task, priority);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
};
var defaultScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Scheduler/defaultScheduler"), () => new MixedScheduler(2048));
var SyncScheduler = class {
  constructor() {
    this.tasks = new PriorityBuckets();
    this.deferred = false;
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task, priority) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task, priority);
    } else {
      this.tasks.scheduleTask(task, priority);
    }
  }
  /**
   * @since 1.0.0
   */
  flush() {
    while (this.tasks.buckets.length > 0) {
      const tasks = this.tasks.buckets;
      this.tasks.buckets = [];
      for (const [_, toRun] of tasks) {
        for (let i = 0; i < toRun.length; i++) {
          toRun[i]();
        }
      }
    }
    this.deferred = true;
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/core.mjs
var _a6;
var _b5;
var _c3;
var _d;
var EffectErrorSymbolKey = "@effect/io/Effect/Error";
var EffectErrorTypeId = /* @__PURE__ */ Symbol.for(EffectErrorSymbolKey);
var isEffectError = (u) => typeof u === "object" && u != null && EffectErrorTypeId in u;
var makeEffectError = (cause3) => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause: cause3
});
var blocked = (blockedRequests, _continue3) => {
  const effect = new EffectPrimitive("Blocked");
  effect.i0 = blockedRequests;
  effect.i1 = _continue3;
  return effect;
};
var runRequestBlock = (blockedRequests) => {
  const effect = new EffectPrimitive("RunBlocked");
  effect.i0 = blockedRequests;
  return effect;
};
var EffectTypeId2 = /* @__PURE__ */ Symbol.for("@effect/io/Effect");
var RevertFlags = class {
  constructor(patch11, op) {
    this.patch = patch11;
    this.op = op;
    this._tag = OP_REVERT_FLAGS;
  }
};
var EffectPrimitive = class {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_a6] = effectVariance2;
  }
  [(_a6 = EffectTypeId2, symbol2)](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var EffectPrimitiveFailure = class {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_b5] = effectVariance2;
  }
  [(_b5 = EffectTypeId2, symbol2)](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  get cause() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _tag: this._tag,
      cause: this.cause.toJSON()
    };
  }
  toString() {
    return pretty2(this.cause);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
};
var EffectPrimitiveSuccess = class {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_c3] = effectVariance2;
  }
  [(_c3 = EffectTypeId2, symbol2)](that) {
    return this === that;
  }
  [symbol]() {
    return random(this);
  }
  get value() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _tag: this._tag,
      value: this.value
    };
  }
  toString() {
    return `Success: ${String(this.value)}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
};
var effectVariance2 = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};
var isEffect = (u) => typeof u === "object" && u != null && EffectTypeId2 in u;
var withFiberRuntime = (withRuntime) => {
  const effect = new EffectPrimitive(OP_WITH_RUNTIME);
  effect.i0 = withRuntime;
  return effect;
};
var acquireUseRelease = /* @__PURE__ */ dual(3, (acquire, use, release) => uninterruptibleMask((restore) => flatMap7(acquire, (a) => flatMap7(exit(suspend(() => restore(use(a)))), (exit3) => suspend(() => release(a, exit3)).pipe(matchCauseEffect({
  onFailure: (cause3) => {
    switch (exit3._tag) {
      case OP_FAILURE: {
        return failCause(parallel(exit3.i0, cause3));
      }
      case OP_SUCCESS: {
        return failCause(cause3);
      }
    }
  },
  onSuccess: () => exit3
}))))));
var as2 = /* @__PURE__ */ dual(2, (self, value2) => flatMap7(self, () => succeed(value2)));
var asUnit = (self) => as2(self, void 0);
var async = (register, blockingOn = none4) => suspend(() => {
  let cancelerRef = void 0;
  let controllerRef = void 0;
  const effect = new EffectPrimitive(OP_ASYNC);
  if (register.length !== 1) {
    const controller = new AbortController();
    controllerRef = controller;
    effect.i0 = (resume2) => {
      cancelerRef = register(resume2, controller.signal);
    };
  } else {
    effect.i0 = (resume2) => {
      cancelerRef = register(resume2);
    };
  }
  effect.i1 = blockingOn;
  return onInterrupt(effect, () => {
    if (controllerRef) {
      controllerRef.abort();
    }
    return cancelerRef ?? unit;
  });
});
var asyncEither = (register, blockingOn = none4) => async((resume2) => {
  const result = register(resume2);
  if (isRight2(result)) {
    resume2(result.right);
  } else {
    return result.left;
  }
}, blockingOn);
var catchAllCause = /* @__PURE__ */ dual(2, (self, f) => {
  const effect = new EffectPrimitive(OP_ON_FAILURE);
  effect.i0 = self;
  effect.i1 = f;
  return effect;
});
var catchAll = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: f,
  onSuccess: succeed
}));
var unified = (f) => (...args) => f(...args);
var catchSome = /* @__PURE__ */ dual(2, (self, pf) => matchCauseEffect(self, {
  onFailure: unified((cause3) => {
    const either5 = failureOrCause(cause3);
    switch (either5._tag) {
      case "Left": {
        return getOrElse(() => failCause(cause3))(pf(either5.left));
      }
      case "Right": {
        return failCause(either5.right);
      }
    }
  }),
  onSuccess: succeed
}));
var checkInterruptible = (f) => withFiberRuntime((_, status) => f(interruption(status.runtimeFlags)));
var die2 = (defect) => failCause(die(defect));
var dieMessage = (message) => failCauseSync(() => die(RuntimeException(message)));
var dieSync = (evaluate) => failCauseSync(() => die(evaluate()));
var either2 = (self) => matchEffect(self, {
  onFailure: (e) => succeed(left2(e)),
  onSuccess: (a) => succeed(right2(a))
});
var context = () => suspend(() => fiberRefGet(currentContext));
var contextWithEffect = (f) => flatMap7(context(), f);
var exit = (self) => matchCause(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
var fail2 = (error2) => failCause(fail(error2));
var failSync = (evaluate) => failCauseSync(() => fail(evaluate()));
var failCause = (cause3) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.i0 = cause3;
  return effect;
};
var failCauseSync = (evaluate) => flatMap7(sync(evaluate), failCause);
var fiberId = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.id()));
var fiberIdWith = (f) => withFiberRuntime((state) => f(state.id()));
var flatMap7 = /* @__PURE__ */ dual(2, (self, f) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS);
  effect.i0 = self;
  effect.i1 = f;
  return effect;
});
var step2 = (self) => {
  const effect = new EffectPrimitive("OnStep");
  effect.i0 = self;
  effect.i1 = exitSucceed;
  return effect;
};
var flatMapStep = (self, f) => {
  const effect = new EffectPrimitive("OnStep");
  effect.i0 = self;
  effect.i1 = f;
  return effect;
};
var flatten5 = (self) => flatMap7(self, identity);
var flip = (self) => matchEffect(self, {
  onFailure: succeed,
  onSuccess: fail2
});
var matchCause = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => succeed(onFailure(cause3)),
  onSuccess: (a) => succeed(onSuccess(a))
}));
var matchCauseEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS_AND_FAILURE);
  effect.i0 = self;
  effect.i1 = onFailure;
  effect.i2 = onSuccess;
  return effect;
});
var matchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const failures3 = failures(cause3);
    const defects2 = defects(cause3);
    if (defects2.length > 0) {
      return failCause(electFailures(cause3));
    }
    if (failures3.length > 0) {
      return onFailure(unsafeHead(failures3));
    }
    return failCause(cause3);
  },
  onSuccess
}));
var forEachSequential = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable(self);
  const ret = new Array(arr.length);
  let i = 0;
  return as2(whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: (b) => {
      ret[i++] = b;
    }
  }), ret);
}));
var forEachSequentialDiscard = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable(self);
  let i = 0;
  return whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: () => {
      i++;
    }
  });
}));
var if_ = /* @__PURE__ */ dual((args) => typeof args[0] === "boolean" || isEffect(args[0]), (self, {
  onFalse,
  onTrue
}) => typeof self === "boolean" ? self ? onTrue : onFalse : flatMap7(self, unified((b) => b ? onTrue : onFalse)));
var interrupt2 = /* @__PURE__ */ flatMap7(fiberId, (fiberId3) => interruptWith(fiberId3));
var interruptWith = (fiberId3) => failCause(interrupt(fiberId3));
var interruptible2 = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = enable3(Interruption);
  const _continue3 = (orBlock) => {
    if (orBlock._tag === "Blocked") {
      return blocked(orBlock.i0, interruptible2(orBlock.i1));
    } else {
      return orBlock;
    }
  };
  effect.i1 = () => flatMapStep(self, _continue3);
  return effect;
};
var interruptibleMask = (f) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = enable3(Interruption);
  const _continue3 = (step4) => {
    if (step4._tag === "Blocked") {
      return blocked(step4.i0, interruptible2(step4.i1));
    }
    return step4;
  };
  effect.i1 = (oldFlags) => interruption(oldFlags) ? step2(f(interruptible2)) : step2(f(uninterruptible));
  return flatMap7(effect, _continue3);
};
var intoDeferred = /* @__PURE__ */ dual(2, (self, deferred) => uninterruptibleMask((restore) => flatMap7(exit(restore(self)), (exit3) => deferredDone(deferred, exit3))));
var map9 = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => sync(() => f(a))));
var mapBoth = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchEffect(self, {
  onFailure: (e) => failSync(() => onFailure(e)),
  onSuccess: (a) => sync(() => onSuccess(a))
}));
var mapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either5 = failureOrCause(cause3);
    switch (either5._tag) {
      case "Left": {
        return failSync(() => f(either5.left));
      }
      case "Right": {
        return failCause(either5.right);
      }
    }
  },
  onSuccess: succeed
}));
var onError = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, unified((exit3) => exitIsSuccess(exit3) ? unit : cleanup(exit3.i0))));
var onExit = /* @__PURE__ */ dual(2, (self, cleanup) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => {
    const result = exitFailCause(cause1);
    return matchCauseEffect(cleanup(result), {
      onFailure: (cause22) => exitFailCause(sequential(cause1, cause22)),
      onSuccess: () => result
    });
  },
  onSuccess: (success2) => {
    const result = exitSucceed(success2);
    return zipRight(cleanup(result), result);
  }
})));
var onInterrupt = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, exitMatch({
  onFailure: (cause3) => isInterruptedOnly(cause3) ? asUnit(cleanup(interruptors(cause3))) : unit,
  onSuccess: () => unit
})));
var orElse2 = /* @__PURE__ */ dual(2, (self, that) => attemptOrElse(self, that, succeed));
var orDie = (self) => orDieWith(self, identity);
var orDieWith = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: (e) => die2(f(e)),
  onSuccess: succeed
}));
var partitionMap2 = (elements, f) => fromIterable(elements).reduceRight(([lefts, rights], current) => {
  const either5 = f(current);
  switch (either5._tag) {
    case "Left": {
      return [[either5.left, ...lefts], rights];
    }
    case "Right": {
      return [lefts, [either5.right, ...rights]];
    }
  }
}, [new Array(), new Array()]);
var provideContext = /* @__PURE__ */ dual(2, (self, context4) => fiberRefLocally(currentContext, context4)(self));
var provideSomeContext = /* @__PURE__ */ dual(2, (self, context4) => fiberRefLocallyWith(currentContext, (parent) => merge3(parent, context4))(self));
var mapInputContext = /* @__PURE__ */ dual(2, (self, f) => contextWithEffect((context4) => provideContext(self, f(context4))));
var runtimeFlags = /* @__PURE__ */ withFiberRuntime((_, status) => succeed(status.runtimeFlags));
var succeed = (value2) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.i0 = value2;
  return effect;
};
var suspend = (effect) => flatMap7(sync(effect), identity);
var sync = (evaluate) => {
  const effect = new EffectPrimitive(OP_SYNC);
  effect.i0 = evaluate;
  return effect;
};
var tap = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => as2(f(a), a)));
var transplant = (f) => withFiberRuntime((state) => {
  const scopeOverride = state.getFiberRef(currentForkScopeOverride);
  const scope3 = getOrElse(() => state.scope())(scopeOverride);
  return f(fiberRefLocally(currentForkScopeOverride, some2(scope3)));
});
var attemptOrElse = /* @__PURE__ */ dual(3, (self, that, onSuccess) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const defects2 = defects(cause3);
    if (defects2.length > 0) {
      return failCause(getOrThrow(keepDefectsAndElectFailures(cause3)));
    }
    return that();
  },
  onSuccess
}));
var uninterruptible = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = disable2(Interruption);
  effect.i1 = () => flatMapStep(self, _continue3);
  const _continue3 = (orBlock) => {
    if (orBlock._tag === "Blocked") {
      return blocked(orBlock.i0, uninterruptible(orBlock.i1));
    } else {
      return orBlock;
    }
  };
  return effect;
};
var uninterruptibleMask = (f) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = disable2(Interruption);
  const _continue3 = (step4) => {
    if (step4._tag === "Blocked") {
      return blocked(step4.i0, uninterruptible(step4.i1));
    }
    return step4;
  };
  effect.i1 = (oldFlags) => interruption(oldFlags) ? step2(f(interruptible2)) : step2(f(uninterruptible));
  return flatMap7(effect, _continue3);
};
var unit = /* @__PURE__ */ succeed(void 0);
var updateRuntimeFlags = (patch11) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = patch11;
  effect.i1 = void 0;
  return effect;
};
var whenEffect = /* @__PURE__ */ dual(2, (self, predicate) => flatMap7(predicate, (b) => {
  if (b) {
    return map9(some2)(self);
  }
  return succeed(none2());
}));
var whileLoop = (options) => {
  const effect = new EffectPrimitive(OP_WHILE);
  effect.i0 = options.while;
  effect.i1 = options.body;
  effect.i2 = options.step;
  return effect;
};
var withConcurrency = /* @__PURE__ */ dual(2, (self, concurrency) => fiberRefLocally(self, currentConcurrency, concurrency));
var withRequestBatching = /* @__PURE__ */ dual(2, (self, requestBatching) => fiberRefLocally(self, currentRequestBatching, requestBatching));
var withRuntimeFlags = /* @__PURE__ */ dual(2, (self, update6) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = update6;
  effect.i1 = () => self;
  return effect;
});
var withTracerTiming = /* @__PURE__ */ dual(2, (effect, enabled2) => fiberRefLocally(effect, currentTracerTimingEnabled, enabled2));
var yieldNow = (options) => {
  const effect = new EffectPrimitive(OP_YIELD);
  return typeof options?.priority !== "undefined" ? withSchedulingPriority(options.priority)(effect) : effect;
};
var zip3 = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, (a) => map9(that, (b) => [a, b])));
var zipLeft = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, (a) => as2(that, a)));
var zipRight = /* @__PURE__ */ dual(2, (self, that) => flatMap7(self, () => that));
var zipWith2 = /* @__PURE__ */ dual(3, (self, that, f) => flatMap7(self, (a) => map9(that, (b) => f(a, b))));
var never = /* @__PURE__ */ asyncEither(() => {
  const interval = setInterval(() => {
  }, 2 ** 31 - 1);
  return left2(sync(() => clearInterval(interval)));
});
var interruptFiber = (self) => flatMap7(fiberId, (fiberId3) => interruptAsFiber(fiberId3)(self));
var interruptAsFiber = /* @__PURE__ */ dual(2, (self, fiberId3) => flatMap7(self.interruptAsFork(fiberId3), () => self.await()));
var logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var allLogLevels = [logLevelAll, logLevelTrace, logLevelDebug, logLevelInfo, logLevelWarning, logLevelError, logLevelFatal, logLevelNone];
var FiberRefSymbolKey = "@effect/io/FiberRef";
var FiberRefTypeId = /* @__PURE__ */ Symbol.for(FiberRefSymbolKey);
var fiberRefVariance = {
  _A: (_) => _
};
var fiberRefGet = (self) => fiberRefModify(self, (a) => [a, a]);
var fiberRefGetWith = /* @__PURE__ */ dual(2, (self, f) => flatMap7(fiberRefGet(self), f));
var fiberRefSet = /* @__PURE__ */ dual(2, (self, value2) => fiberRefModify(self, () => [void 0, value2]));
var fiberRefModify = /* @__PURE__ */ dual(2, (self, f) => withFiberRuntime((state) => {
  const [b, a] = f(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}));
var RequestResolverSymbolKey = "@effect/io/RequestResolver";
var RequestResolverTypeId = /* @__PURE__ */ Symbol.for(RequestResolverSymbolKey);
var dataSourceVariance = {
  _R: (_) => _,
  _A: (_) => _
};
var RequestResolverImpl = class _RequestResolverImpl {
  constructor(runAll, target) {
    this.runAll = runAll;
    this.target = target;
    this[_d] = dataSourceVariance;
    this.runAll = runAll;
  }
  [(_d = RequestResolverTypeId, symbol)]() {
    return this.target ? hash(this.target) : random(this);
  }
  [symbol2](that) {
    return this.target ? isRequestResolver(that) && equals(this.target, that.target) : this === that;
  }
  identified(...ids4) {
    return new _RequestResolverImpl(this.runAll, fromIterable5(ids4));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isRequestResolver = (u) => typeof u === "object" && u != null && RequestResolverTypeId in u;
var fiberRefLocally = /* @__PURE__ */ dual(3, (use, self, value2) => flatMap7(acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value2)), () => step2(use), (oldValue) => fiberRefSet(self, oldValue)), (res) => {
  if (res._tag === "Blocked") {
    return blocked(res.i0, fiberRefLocally(res.i1, self, value2));
  }
  return res;
}));
var fiberRefLocallyWith = /* @__PURE__ */ dual(3, (use, self, f) => fiberRefGetWith(self, (a) => fiberRefLocally(use, self, f(a))));
var fiberRefUnsafeMake = (initial, options) => fiberRefUnsafeMakePatch(initial, {
  differ: update3(),
  fork: options?.fork ?? identity,
  join: options?.join
});
var fiberRefUnsafeMakeHashSet = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: hashSet2(),
  fork: empty14()
});
var fiberRefUnsafeMakeContext = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: environment2(),
  fork: empty11()
});
var fiberRefUnsafeMakePatch = (initial, options) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => diff5(oldValue, newValue)(options.differ),
  combine: (first, second) => combine6(first, second)(options.differ),
  patch: (patch11) => (oldValue) => patch5(patch11, oldValue)(options.differ),
  fork: options.fork,
  join: options.join ?? ((_, n) => n),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var fiberRefUnsafeMakeRuntimeFlags = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ,
  fork: empty18
});
var currentContext = /* @__PURE__ */ fiberRefUnsafeMakeContext(/* @__PURE__ */ empty3());
var currentSchedulingPriority = /* @__PURE__ */ fiberRefUnsafeMake(0);
var currentMaxFiberOps = /* @__PURE__ */ fiberRefUnsafeMake(2048);
var currentLogAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentLogAnnotation"), () => fiberRefUnsafeMake(empty6()));
var currentLogLevel = /* @__PURE__ */ fiberRefUnsafeMake(logLevelInfo);
var currentLogSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentLogSpan"), () => fiberRefUnsafeMake(empty15()));
var currentScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentScheduler"), () => fiberRefUnsafeMake(defaultScheduler));
var withScheduler = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentScheduler, scheduler));
var withSchedulingPriority = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentSchedulingPriority, scheduler));
var withMaxFiberOps = /* @__PURE__ */ dual(2, (self, ops) => fiberRefLocally(self, currentMaxFiberOps, ops));
var currentConcurrency = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentConcurrency"), () => fiberRefUnsafeMake("unbounded"));
var currentRequestBatching = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentRequestBatching"), () => fiberRefUnsafeMake(true));
var currentUnhandledErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentUnhandledErrorLogLevel"), () => fiberRefUnsafeMake(some2(logLevelDebug)));
var withUnhandledErrorLogLevel = /* @__PURE__ */ dual(2, (self, level) => fiberRefLocally(self, currentUnhandledErrorLogLevel, level));
var currentMetricLabels = /* @__PURE__ */ fiberRefUnsafeMakeHashSet(/* @__PURE__ */ empty12());
var metricLabels = /* @__PURE__ */ fiberRefGet(currentMetricLabels);
var currentForkScopeOverride = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentForkScopeOverride"), () => fiberRefUnsafeMake(none2(), {
  fork: () => none2(),
  join: (parent, _) => parent
}));
var currentInterruptedCause = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentInterruptedCause"), () => fiberRefUnsafeMake(empty16, {
  fork: () => empty16,
  join: (parent, _) => parent
}));
var currentTracerSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentTracerSpan"), () => fiberRefUnsafeMake(empty15()));
var currentTracerTimingEnabled = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentTracerTiming"), () => fiberRefUnsafeMake(true));
var currentTracerSpanAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentTracerSpanAnnotations"), () => fiberRefUnsafeMake(empty6()));
var currentTracerSpanLinks = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentTracerSpanLinks"), () => fiberRefUnsafeMake(empty8()));
var ScopeTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Scope");
var CloseableScopeTypeId = /* @__PURE__ */ Symbol.for("@effect/io/CloseableScope");
var scopeAddFinalizerExit = (self, finalizer) => self.addFinalizer(finalizer);
var scopeClose = (self, exit3) => self.close(exit3);
var scopeFork = (self, strategy) => self.fork(strategy);
var releaseMapAdd = /* @__PURE__ */ dual(2, (self, finalizer) => map9(releaseMapAddIfOpen(self, finalizer), match2({
  onNone: () => () => unit,
  onSome: (key2) => (exit3) => releaseMapRelease(key2, exit3)(self)
})));
var releaseMapRelease = /* @__PURE__ */ dual(3, (self, key2, exit3) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      return unit;
    }
    case "Running": {
      const finalizer = self.state.finalizers.get(key2);
      self.state.finalizers.delete(key2);
      if (finalizer != null) {
        return self.state.update(finalizer)(exit3);
      }
      return unit;
    }
  }
}));
var releaseMapAddIfOpen = /* @__PURE__ */ dual(2, (self, finalizer) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      self.state.nextKey += 1;
      return as2(finalizer(self.state.exit), none2());
    }
    case "Running": {
      const key2 = self.state.nextKey;
      self.state.finalizers.set(key2, finalizer);
      self.state.nextKey += 1;
      return succeed(some2(key2));
    }
  }
}));
var releaseMapMake = /* @__PURE__ */ sync(() => ({
  state: {
    _tag: "Running",
    nextKey: 0,
    finalizers: /* @__PURE__ */ new Map(),
    update: identity
  }
}));
var exitIsFailure = (self) => self._tag === "Failure";
var exitIsSuccess = (self) => self._tag === "Success";
var exitAs = /* @__PURE__ */ dual(2, (self, value2) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(value2);
    }
  }
});
var exitAsUnit = (self) => exitAs(self, void 0);
var exitCollectAll = (exits, options) => exitCollectAllInternal(exits, options?.parallel ? parallel : sequential);
var exitDie = (defect) => exitFailCause(die(defect));
var exitFail = (error2) => exitFailCause(fail(error2));
var exitFailCause = (cause3) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.i0 = cause3;
  return effect;
};
var exitFlatMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return f(self.i0);
    }
  }
});
var exitFlatten = (self) => exitFlatMap(identity)(self);
var exitInterrupt = (fiberId3) => exitFailCause(interrupt(fiberId3));
var exitMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(f(self.i0));
    }
  }
});
var exitMatch = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return onFailure(self.i0);
    }
    case OP_SUCCESS: {
      return onSuccess(self.i0);
    }
  }
});
var exitMatchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return onFailure(self.i0);
    }
    case OP_SUCCESS: {
      return onSuccess(self.i0);
    }
  }
});
var exitSucceed = (value2) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.i0 = value2;
  return effect;
};
var exitUnit = /* @__PURE__ */ exitSucceed(void 0);
var exitZipWith = /* @__PURE__ */ dual(3, (self, that, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitFailCause(self.i0);
        }
        case OP_FAILURE: {
          return exitFailCause(onFailure(self.i0, that.i0));
        }
      }
    }
    case OP_SUCCESS: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitSucceed(onSuccess(self.i0, that.i0));
        }
        case OP_FAILURE: {
          return exitFailCause(that.i0);
        }
      }
    }
  }
});
var exitCollectAllInternal = (exits, combineCauses) => {
  const list = fromIterable5(exits);
  if (!isNonEmpty(list)) {
    return none2();
  }
  return some2(exitMap((chunk4) => Array.from(chunk4))(exitMap(reverse3)(reduce(exitMap(of2)(headNonEmpty2(list)), (accumulator, current) => exitZipWith(current, {
    onSuccess: (list2, value2) => prepend2(value2)(list2),
    onFailure: combineCauses
  })(accumulator))(tailNonEmpty2(list)))));
};
var deferredUnsafeMake = (fiberId3) => ({
  [DeferredTypeId]: deferredVariance,
  state: make8(pending([])),
  blockingOn: fiberId3,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var deferredMake = () => flatMap7(fiberId, (id) => deferredMakeAs(id));
var deferredMakeAs = (fiberId3) => sync(() => deferredUnsafeMake(fiberId3));
var deferredAwait = (self) => asyncEither((k) => {
  const state = get6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return right2(state.effect);
    }
    case OP_STATE_PENDING: {
      set3(pending([k, ...state.joiners]))(self.state);
      return left2(deferredInterruptJoiner(self, k));
    }
  }
}, self.blockingOn);
var deferredComplete = /* @__PURE__ */ dual(2, (self, effect) => intoDeferred(effect, self));
var deferredCompleteWith = /* @__PURE__ */ dual(2, (self, effect) => sync(() => {
  const state = get6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return false;
    }
    case OP_STATE_PENDING: {
      set3(done(effect))(self.state);
      for (let i = 0; i < state.joiners.length; i++) {
        state.joiners[i](effect);
      }
      return true;
    }
  }
}));
var deferredDone = /* @__PURE__ */ dual(2, (self, exit3) => deferredCompleteWith(self, exit3));
var deferredFail = /* @__PURE__ */ dual(2, (self, error2) => deferredCompleteWith(self, fail2(error2)));
var deferredFailCause = /* @__PURE__ */ dual(2, (self, cause3) => deferredCompleteWith(self, failCause(cause3)));
var deferredInterrupt = (self) => flatMap7(fiberId, (fiberId3) => deferredCompleteWith(self, interruptWith(fiberId3)));
var deferredSucceed = /* @__PURE__ */ dual(2, (self, value2) => deferredCompleteWith(self, succeed(value2)));
var deferredUnsafeDone = (self, effect) => {
  const state = get6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set3(done(effect))(self.state);
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect);
    }
  }
};
var deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = get6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set3(pending(state.joiners.filter((j) => j !== joiner)))(self.state);
  }
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Deferred.mjs
var _await = deferredAwait;
var done2 = deferredDone;
var interrupt3 = deferredInterrupt;
var unsafeMake3 = deferredUnsafeMake;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Exit.mjs
var flatten6 = exitFlatten;
var succeed2 = exitSucceed;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/clock.mjs
var _a7;
var ClockSymbolKey = "@effect/io/Clock";
var ClockTypeId = /* @__PURE__ */ Symbol.for(ClockSymbolKey);
var clockTag = /* @__PURE__ */ Tag(ClockTypeId);
var MAX_TIMER_MILLIS = 2 ** 31 - 1;
var globalClockScheduler = {
  unsafeSchedule(task, duration) {
    const millis2 = toMillis(duration);
    if (millis2 > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = setTimeout(() => {
      completed = true;
      task();
    }, millis2);
    return () => {
      clearTimeout(handle);
      return !completed;
    };
  }
};
var performanceNowNanos = /* @__PURE__ */ function() {
  const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e6;
  }
  const origin = "timeOrigin" in performance && typeof performance.timeOrigin === "number" ? /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(performance.timeOrigin * 1e6)) : /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e6;
  return () => origin + BigInt(Math.round(performance.now() * 1e6));
}();
var processOrPerformanceNow = /* @__PURE__ */ function() {
  const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
  if (!processHrtime) {
    return performanceNowNanos;
  }
  const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
  return () => origin + processHrtime.bigint();
}();
var ClockImpl = class {
  constructor() {
    this[_a7] = ClockTypeId;
    this.currentTimeMillis = sync(() => this.unsafeCurrentTimeMillis());
    this.currentTimeNanos = sync(() => this.unsafeCurrentTimeNanos());
  }
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return processOrPerformanceNow();
  }
  scheduler() {
    return succeed(globalClockScheduler);
  }
  sleep(duration) {
    return asyncEither((cb) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => cb(unit), duration);
      return left2(asUnit(sync(canceler)));
    });
  }
};
_a7 = ClockTypeId;
var make16 = () => new ClockImpl();

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/configError.mjs
var OP_AND = "And";
var OP_OR = "Or";
var OP_INVALID_DATA = "InvalidData";
var OP_MISSING_DATA = "MissingData";
var OP_SOURCE_UNAVAILABLE = "SourceUnavailable";
var OP_UNSUPPORTED = "Unsupported";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/configError.mjs
var ConfigErrorSymbolKey = "@effect/io/Config/Error";
var ConfigErrorTypeId = /* @__PURE__ */ Symbol.for(ConfigErrorSymbolKey);
var proto2 = {
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
var And = (self, that) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_AND;
  error2.left = self;
  error2.right = that;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  return error2;
};
var Or = (self, that) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_OR;
  error2.left = self;
  error2.right = that;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  return error2;
};
var InvalidData = (path, message, options = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_INVALID_DATA;
  error2.path = path;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path2 = join(options.pathDelim)(this.path);
      return `(Invalid data at ${path2}: "${this.message}")`;
    }
  });
  return error2;
};
var MissingData = (path, message, options = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_MISSING_DATA;
  error2.path = path;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path2 = join(options.pathDelim)(this.path);
      return `(Missing data at ${path2}: "${this.message}")`;
    }
  });
  return error2;
};
var SourceUnavailable = (path, message, cause3, options = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_SOURCE_UNAVAILABLE;
  error2.path = path;
  error2.message = message;
  error2.cause = cause3;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path2 = join(options.pathDelim)(this.path);
      return `(Source unavailable at ${path2}: "${this.message}")`;
    }
  });
  return error2;
};
var Unsupported = (path, message, options = {
  pathDelim: "."
}) => {
  const error2 = Object.create(proto2);
  error2._tag = OP_UNSUPPORTED;
  error2.path = path;
  error2.message = message;
  Object.defineProperty(error2, "toString", {
    enumerable: false,
    value() {
      const path2 = join(options.pathDelim)(this.path);
      return `(Unsupported operation at ${path2}: "${this.message}")`;
    }
  });
  return error2;
};
var prefixed = /* @__PURE__ */ dual(2, (self, prefix) => {
  switch (self._tag) {
    case OP_AND: {
      return And(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
    }
    case OP_OR: {
      return Or(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
    }
    case OP_INVALID_DATA: {
      return InvalidData([...prefix, ...self.path], self.message);
    }
    case OP_MISSING_DATA: {
      return MissingData([...prefix, ...self.path], self.message);
    }
    case OP_SOURCE_UNAVAILABLE: {
      return SourceUnavailable([...prefix, ...self.path], self.message, self.cause);
    }
    case OP_UNSUPPORTED: {
      return Unsupported([...prefix, ...self.path], self.message);
    }
  }
});
var IsMissingDataOnlyReducer = {
  andCase: (_, left3, right3) => left3 && right3,
  orCase: (_, left3, right3) => left3 && right3,
  invalidDataCase: constFalse,
  missingDataCase: constTrue,
  sourceUnavailableCase: constFalse,
  unsupportedCase: constFalse
};
var reduceWithContext2 = /* @__PURE__ */ dual(3, (self, context4, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const error2 = input.pop();
    switch (error2._tag) {
      case OP_AND: {
        input.push(error2.right);
        input.push(error2.left);
        output.push(left2({
          _tag: "AndCase"
        }));
        break;
      }
      case OP_OR: {
        input.push(error2.right);
        input.push(error2.left);
        output.push(left2({
          _tag: "OrCase"
        }));
        break;
      }
      case OP_INVALID_DATA: {
        output.push(right2(reducer.invalidDataCase(context4, error2.path, error2.message)));
        break;
      }
      case OP_MISSING_DATA: {
        output.push(right2(reducer.missingDataCase(context4, error2.path, error2.message)));
        break;
      }
      case OP_SOURCE_UNAVAILABLE: {
        output.push(right2(reducer.sourceUnavailableCase(context4, error2.path, error2.message, error2.cause)));
        break;
      }
      case OP_UNSUPPORTED: {
        output.push(right2(reducer.unsupportedCase(context4, error2.path, error2.message)));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either5 = output.pop();
    switch (either5._tag) {
      case "Left": {
        switch (either5.left._tag) {
          case "AndCase": {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value2 = reducer.andCase(context4, left3, right3);
            accumulator.push(value2);
            break;
          }
          case "OrCase": {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value2 = reducer.orCase(context4, left3, right3);
            accumulator.push(value2);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either5.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: ConfigError.reduceWithContext - please report an issue at https://github.com/Effect-TS/io/issues");
  }
  return accumulator.pop();
});
var isMissingDataOnly = (self) => reduceWithContext2(self, void 0, IsMissingDataOnlyReducer);

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Config/Error.mjs
var isMissingDataOnly2 = isMissingDataOnly;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/configSecret.mjs
var ConfigSecretSymbolKey = "@effect/io/Config/Secret";
var ConfigSecretTypeId = /* @__PURE__ */ Symbol.for(ConfigSecretSymbolKey);
var proto3 = {
  [ConfigSecretTypeId]: ConfigSecretTypeId,
  [symbol]() {
    return combine(array2(this.raw))(hash(ConfigSecretSymbolKey));
  },
  [symbol2](that) {
    return isConfigSecret(that) && this.raw.length === that.raw.length && this.raw.every((v, i) => equals(v, that.raw[i]));
  }
};
var isConfigSecret = (u) => {
  return typeof u === "object" && u != null && ConfigSecretTypeId in u;
};
var make17 = (bytes) => {
  const secret3 = Object.create(proto3);
  Object.defineProperty(secret3, "toString", {
    enumerable: false,
    value() {
      return "ConfigSecret(<redacted>)";
    }
  });
  Object.defineProperty(secret3, "raw", {
    enumerable: false,
    value: bytes
  });
  return secret3;
};
var fromString = (text) => {
  return make17(text.split("").map((char) => char.charCodeAt(0)));
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/config.mjs
var OP_CONSTANT = "Constant";
var OP_FAIL2 = "Fail";
var OP_FALLBACK = "Fallback";
var OP_DESCRIBED = "Described";
var OP_LAZY = "Lazy";
var OP_MAP_OR_FAIL = "MapOrFail";
var OP_NESTED = "Nested";
var OP_PRIMITIVE = "Primitive";
var OP_SEQUENCE = "Sequence";
var OP_HASHMAP = "HashMap";
var OP_ZIP_WITH = "ZipWith";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/config.mjs
var ConfigSymbolKey = "@effect/io/Config";
var ConfigTypeId = /* @__PURE__ */ Symbol.for(ConfigSymbolKey);
var configVariance = {
  _A: (_) => _
};
var proto4 = {
  [ConfigTypeId]: configVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var boolean = (name) => {
  const config3 = primitive("a boolean property", (text) => {
    switch (text) {
      case "true":
      case "yes":
      case "on":
      case "1": {
        return right2(true);
      }
      case "false":
      case "no":
      case "off":
      case "0": {
        return right2(false);
      }
      default: {
        const error2 = InvalidData([], `Expected a boolean value, but received ${text}`);
        return left2(error2);
      }
    }
  });
  return name === void 0 ? config3 : nested(name)(config3);
};
var array4 = (config3, name) => {
  return map10(toReadonlyArray)(chunk2(config3, name));
};
var chunk2 = (config3, name) => {
  return map10(name === void 0 ? repeat(config3) : nested(name)(repeat(config3)), unsafeFromArray);
};
var date = (name) => {
  const config3 = primitive("a date property", (text) => {
    const result = Date.parse(text);
    if (Number.isNaN(result)) {
      return left2(InvalidData([], `Expected a date value but received ${text}`));
    }
    return right2(new Date(result));
  });
  return name === void 0 ? config3 : nested(name)(config3);
};
var fail3 = (message) => {
  const fail6 = Object.create(proto4);
  fail6._tag = OP_FAIL2;
  fail6.message = message;
  fail6.parse = () => left2(Unsupported([], message));
  return fail6;
};
var number3 = (name) => {
  const config3 = primitive("a number property", (text) => {
    const result = Number.parseFloat(text);
    if (Number.isNaN(result)) {
      return left2(InvalidData([], `Expected an number value but received ${text}`));
    }
    return right2(result);
  });
  return name === void 0 ? config3 : nested(name)(config3);
};
var integer = (name) => {
  const config3 = primitive("an integer property", (text) => {
    const result = Number.parseInt(text, 10);
    if (Number.isNaN(result)) {
      return left2(InvalidData([], `Expected an integer value but received ${text}`));
    }
    return right2(result);
  });
  return name === void 0 ? config3 : nested(name)(config3);
};
var logLevel = (name) => {
  const config3 = mapOrFail(string2(), (value2) => {
    const label = value2.toUpperCase();
    const level = allLogLevels.find((level2) => level2.label === label);
    return level === void 0 ? left2(InvalidData([], `Expected a log level, but found: ${value2}`)) : right2(level);
  });
  return name === void 0 ? config3 : nested(config3, name);
};
var map10 = /* @__PURE__ */ dual(2, (self, f) => mapOrFail(self, (a) => right2(f(a))));
var mapAttempt = /* @__PURE__ */ dual(2, (self, f) => mapOrFail(self, (a) => {
  try {
    return right2(f(a));
  } catch (error2) {
    return left2(InvalidData([], error2 instanceof Error ? error2.message : `${error2}`));
  }
}));
var mapOrFail = /* @__PURE__ */ dual(2, (self, f) => {
  const mapOrFail3 = Object.create(proto4);
  mapOrFail3._tag = OP_MAP_OR_FAIL;
  mapOrFail3.original = self;
  mapOrFail3.mapOrFail = f;
  return mapOrFail3;
});
var missingError = (name) => {
  return (self) => {
    return MissingData([], `Expected ${self.description} with name ${name}`);
  };
};
var nested = /* @__PURE__ */ dual(2, (self, name) => {
  const nested4 = Object.create(proto4);
  nested4._tag = OP_NESTED;
  nested4.name = name;
  nested4.config = self;
  return nested4;
});
var orElse3 = /* @__PURE__ */ dual(2, (self, that) => {
  const fallback = Object.create(proto4);
  fallback._tag = OP_FALLBACK;
  fallback.first = self;
  fallback.second = suspend2(that);
  fallback.condition = constTrue;
  return fallback;
});
var orElseIf = /* @__PURE__ */ dual(2, (self, options) => {
  const fallback = Object.create(proto4);
  fallback._tag = OP_FALLBACK;
  fallback.first = self;
  fallback.second = suspend2(options.orElse);
  fallback.condition = options.if;
  return fallback;
});
var option = (self) => {
  return orElseIf({
    orElse: () => succeed3(none2()),
    if: isMissingDataOnly2
  })(map10(some2)(self));
};
var primitive = (description2, parse2) => {
  const primitive3 = Object.create(proto4);
  primitive3._tag = OP_PRIMITIVE;
  primitive3.description = description2;
  primitive3.parse = parse2;
  return primitive3;
};
var repeat = (self) => {
  const repeat4 = Object.create(proto4);
  repeat4._tag = OP_SEQUENCE;
  repeat4.config = self;
  return repeat4;
};
var secret = (name) => {
  const config3 = primitive("a secret property", (text) => right2(fromString(text)));
  return name === void 0 ? config3 : nested(name)(config3);
};
var hashSet3 = (config3, name) => {
  const newConfig = map10(chunk2(config3), fromIterable6);
  return name === void 0 ? newConfig : nested(name)(newConfig);
};
var string2 = (name) => {
  const config3 = primitive("a text property", right2);
  return name === void 0 ? config3 : nested(name)(config3);
};
var all2 = (arg) => {
  if (Array.isArray(arg)) {
    return tuple3(arg);
  } else if (Symbol.iterator in arg) {
    return tuple3([...arg]);
  }
  return struct2(arg);
};
var struct2 = (r) => {
  const entries = Object.entries(r);
  let result = map10((value2) => ({
    [entries[0][0]]: value2
  }))(entries[0][1]);
  if (entries.length === 1) {
    return result;
  }
  const rest = entries.slice(1);
  for (const [key2, config3] of rest) {
    result = zipWith3(config3, (record2, value2) => ({
      ...record2,
      [key2]: value2
    }))(result);
  }
  return result;
};
var succeed3 = (value2) => {
  const constant2 = Object.create(proto4);
  constant2._tag = OP_CONSTANT;
  constant2.value = value2;
  constant2.parse = () => right2(value2);
  return constant2;
};
var suspend2 = (config3) => {
  const lazy = Object.create(proto4);
  lazy._tag = OP_LAZY;
  lazy.config = config3;
  return lazy;
};
var sync2 = (value2) => {
  return suspend2(() => succeed3(value2()));
};
var hashMap2 = (config3, name) => {
  const table = Object.create(proto4);
  table._tag = OP_HASHMAP;
  table.valueConfig = config3;
  return name === void 0 ? table : nested(name)(table);
};
var isConfig = (u) => typeof u === "object" && u != null && ConfigTypeId in u;
var tuple3 = (tuple4) => {
  if (tuple4.length === 0) {
    return succeed3([]);
  }
  if (tuple4.length === 1) {
    return map10(tuple4[0], (x) => [x]);
  }
  let result = map10(tuple4[0], (x) => [x]);
  for (let i = 1; i < tuple4.length; i++) {
    const config3 = tuple4[i];
    result = zipWith3(config3, (tuple5, value2) => [...tuple5, value2])(result);
  }
  return result;
};
var unwrap = (wrapped) => {
  if (isConfig(wrapped)) {
    return wrapped;
  }
  return struct2(Object.fromEntries(Object.entries(wrapped).map(([k, a]) => [k, unwrap(a)])));
};
var validate = /* @__PURE__ */ dual(2, (self, {
  message,
  validation
}) => mapOrFail(self, (a) => {
  if (validation(a)) {
    return right2(a);
  }
  return left2(InvalidData([], message));
}));
var withDefault = /* @__PURE__ */ dual(2, (self, def) => orElseIf(self, {
  orElse: () => succeed3(def),
  if: isMissingDataOnly2
}));
var withDescription = /* @__PURE__ */ dual(2, (self, description2) => {
  const described = Object.create(proto4);
  described._tag = OP_DESCRIBED;
  described.config = self;
  described.description = description2;
  return described;
});
var zip4 = /* @__PURE__ */ dual(2, (self, that) => zipWith3(self, that, (a, b) => [a, b]));
var zipWith3 = /* @__PURE__ */ dual(3, (self, that, f) => {
  const zipWith6 = Object.create(proto4);
  zipWith6._tag = OP_ZIP_WITH;
  zipWith6.left = self;
  zipWith6.right = that;
  zipWith6.zip = f;
  return zipWith6;
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/configProvider/pathPatch.mjs
var empty20 = {
  _tag: "Empty"
};
var patch7 = /* @__PURE__ */ dual(2, (path, patch11) => {
  let input = of3(patch11);
  let output = path;
  while (isCons(input)) {
    const patch12 = input.head;
    switch (patch12._tag) {
      case "Empty": {
        input = input.tail;
        break;
      }
      case "AndThen": {
        input = cons(patch12.first, cons(patch12.second, input.tail));
        break;
      }
      case "MapName": {
        output = map2(output, patch12.f);
        input = input.tail;
        break;
      }
      case "Nested": {
        output = prepend(output, patch12.name);
        input = input.tail;
        break;
      }
      case "Unnested": {
        const containsName = contains(patch12.name)(head(output));
        if (containsName) {
          output = tailNonEmpty(output);
          input = input.tail;
        } else {
          return left2(MissingData(output, `Expected ${patch12.name} to be in path in ConfigProvider#unnested`));
        }
        break;
      }
    }
  }
  return right2(output);
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/configProvider.mjs
var concat = (l, r) => [...l, ...r];
var ConfigProviderSymbolKey = "@effect/io/Config/Provider";
var ConfigProviderTypeId = /* @__PURE__ */ Symbol.for(ConfigProviderSymbolKey);
var configProviderTag = /* @__PURE__ */ Tag(ConfigProviderTypeId);
var FlatConfigProviderSymbolKey = "@effect/io/Config/Provider/Flat";
var FlatConfigProviderTypeId = /* @__PURE__ */ Symbol.for(FlatConfigProviderSymbolKey);
var make19 = (options) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
var makeFlat = (options) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch: options.patch,
  load: (path, config3, split = true) => options.load(path, config3, split),
  enumerateChildren: options.enumerateChildren
});
var fromFlat = (flat) => make19({
  load: (config3) => flatMap7(fromFlatLoop(flat, empty(), config3, false), (chunk4) => match2(head(chunk4), {
    onNone: () => fail2(MissingData(empty(), `Expected a single value having structure: ${config3}`)),
    onSome: succeed
  })),
  flattened: flat
});
var fromEnv = (config3 = {}) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, config3);
  const makePathString = (path) => join(pathDelim)(path);
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load = (path, primitive3, split = true) => {
    const pathString = makePathString(path);
    const current = getEnv();
    const valueOpt = pathString in current ? some2(current[pathString]) : none2();
    return flatMap7((value2) => parsePrimitive(value2, path, primitive3, seqDelim, split))(mapError(() => MissingData(path, `Expected ${pathString} to exist in the process context`))(valueOpt));
  };
  const enumerateChildren = (path) => sync(() => {
    const current = getEnv();
    const keys3 = Object.keys(current);
    const keyPaths = Array.from(keys3).map((value2) => unmakePathString(value2.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = unsafeGet(i)(path);
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path.length, path.length + 1));
    return fromIterable6(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load,
    enumerateChildren,
    patch: empty20
  }));
};
var extend = (leftDef, rightDef, left3, right3) => {
  const leftPad = unfold(left3.length, (index2) => index2 >= right3.length ? none2() : some2([leftDef(index2), index2 + 1]));
  const rightPad = unfold(right3.length, (index2) => index2 >= left3.length ? none2() : some2([rightDef(index2), index2 + 1]));
  const leftExtension = concat(left3, leftPad);
  const rightExtension = concat(right3, rightPad);
  return [leftExtension, rightExtension];
};
var fromFlatLoop = (flat, prefix, config3, split) => {
  const op = config3;
  switch (op._tag) {
    case OP_CONSTANT: {
      return succeed(of(op.value));
    }
    case OP_DESCRIBED: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config, split));
    }
    case OP_FAIL2: {
      return fail2(MissingData(prefix, op.message));
    }
    case OP_FALLBACK: {
      return catchAll((error1) => {
        if (op.condition(error1)) {
          return catchAll((error2) => fail2(Or(error1, error2)))(fromFlatLoop(flat, prefix, op.second, split));
        }
        return fail2(error1);
      })(suspend(() => fromFlatLoop(flat, prefix, op.first, split)));
    }
    case OP_LAZY: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config(), split));
    }
    case OP_MAP_OR_FAIL: {
      return suspend(() => flatMap7(forEachSequential((a) => mapError(prefixed(prefix))(op.mapOrFail(a))))(fromFlatLoop(flat, prefix, op.original, split)));
    }
    case OP_NESTED: {
      return suspend(() => fromFlatLoop(flat, concat(prefix, of(op.name)), op.config, split));
    }
    case OP_PRIMITIVE: {
      return flatMap7((prefix2) => flatMap7((values3) => {
        if (values3.length === 0) {
          const name = getOrElse(() => "<n/a>")(last(prefix2));
          return fail2(missingError(name));
        }
        return succeed(values3);
      })(flat.load(prefix2, op, split)))(patch7(prefix, flat.patch));
    }
    case OP_SEQUENCE: {
      return flatMap7((patchedPrefix) => flatMap7((indices) => {
        if (indices.length === 0) {
          return suspend(() => map9(fromFlatLoop(flat, patchedPrefix, op.config, true), of));
        }
        return map9((chunkChunk) => {
          const flattened = flatten2(chunkChunk);
          if (flattened.length === 0) {
            return of(empty());
          }
          return of(flattened);
        })(forEachSequential(indices, (index2) => fromFlatLoop(flat, append(prefix, `[${index2}]`), op.config, true)));
      })(flatMap7(indicesFrom)(flat.enumerateChildren(patchedPrefix))))(patch7(prefix, flat.patch));
    }
    case OP_HASHMAP: {
      return suspend(() => flatMap7((prefix2) => flatMap7((keys3) => {
        return map9((values3) => {
          if (values3.length === 0) {
            return of(empty6());
          }
          const matrix = values3.map((x) => Array.from(x));
          return map2((values4) => fromIterable4(zip(fromIterable(keys3), values4)))(transpose(matrix));
        })(forEachSequential((key2) => fromFlatLoop(flat, concat(prefix2, of(key2)), op.valueConfig, split))(keys3));
      })(flat.enumerateChildren(prefix2)))(patch7(prefix, flat.patch)));
    }
    case OP_ZIP_WITH: {
      return suspend(() => flatMap7((left3) => flatMap7((right3) => {
        if (isLeft2(left3) && isLeft2(right3)) {
          return fail2(And(left3.left, right3.left));
        }
        if (isLeft2(left3) && isRight2(right3)) {
          return fail2(left3.left);
        }
        if (isRight2(left3) && isLeft2(right3)) {
          return fail2(right3.left);
        }
        if (isRight2(left3) && isRight2(right3)) {
          const path = join(".")(prefix);
          const fail6 = fromFlatLoopFail(prefix, path);
          const [lefts, rights] = extend(fail6, fail6, map2(right2)(left3.right), map2(right2)(right3.right));
          return forEachSequential(([left4, right4]) => map9(([left5, right5]) => op.zip(left5, right5))(zip3(left4, right4)))(zip(rights)(lefts));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/io/issues");
      })(either2(fromFlatLoop(flat, prefix, op.right, split))))(either2(fromFlatLoop(flat, prefix, op.left, split))));
    }
  }
};
var fromFlatLoopFail = (prefix, path) => (index2) => left2(MissingData(prefix, `The element at index ${index2} in a sequence at path "${path}" was missing`));
var splitPathString = (text, delim) => {
  const split = text.split(new RegExp(`\\s*${escapeRegex(delim)}\\s*`));
  return split;
};
var parsePrimitive = (text, path, primitive3, delimiter, split) => {
  if (!split) {
    return mapError(prefixed(path))(map9(of)(primitive3.parse(text)));
  }
  return mapError(prefixed(path))(forEachSequential((char) => primitive3.parse(char.trim()))(splitPathString(text, delimiter)));
};
var transpose = (array7) => {
  return Object.keys(array7[0]).map((column) => array7.map((row) => row[column]));
};
var escapeRegex = (string6) => {
  return string6.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};
var indicesFrom = (quotedIndices) => map9(merge)(either2(mapBoth({
  onFailure: () => empty(),
  onSuccess: sort(Order)
})(forEachSequential(quotedIndices, parseQuotedIndex))));
var QUOTED_INDEX_REGEX = /^(\[(\d+)\])$/;
var parseQuotedIndex = (str) => {
  const match7 = str.match(QUOTED_INDEX_REGEX);
  if (match7 !== null) {
    const matchedIndex = match7[2];
    return flatMap(parseInteger)(matchedIndex !== void 0 && matchedIndex.length > 0 ? some2(matchedIndex) : none2());
  }
  return none2();
};
var parseInteger = (str) => {
  const parsedIndex = Number.parseInt(str);
  return Number.isNaN(parsedIndex) ? none2() : some2(parsedIndex);
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/defaultServices/console.mjs
var TypeId12 = /* @__PURE__ */ Symbol("@effect/io/Console");
var consoleTag = /* @__PURE__ */ Tag(TypeId12);
var defaultConsole = {
  [TypeId12]: TypeId12,
  assert(condition, ...args) {
    return sync(() => {
      console.assert(condition, ...args);
    });
  },
  clear: /* @__PURE__ */ sync(() => {
    console.clear();
  }),
  count(label) {
    return sync(() => {
      console.count(label);
    });
  },
  countReset(label) {
    return sync(() => {
      console.countReset(label);
    });
  },
  debug(...args) {
    return sync(() => {
      console.debug(...args);
    });
  },
  dir(item, options) {
    return sync(() => {
      console.dir(item, options);
    });
  },
  dirxml(...args) {
    return sync(() => {
      console.dirxml(...args);
    });
  },
  error(...args) {
    return sync(() => {
      console.error(...args);
    });
  },
  group(options) {
    return options?.collapsed ? sync(() => console.groupCollapsed(options?.label)) : sync(() => console.group(options?.label));
  },
  groupEnd: /* @__PURE__ */ sync(() => {
    console.groupEnd();
  }),
  info(...args) {
    return sync(() => {
      console.info(...args);
    });
  },
  log(...args) {
    return sync(() => {
      console.log(...args);
    });
  },
  table(tabularData, properties) {
    return sync(() => {
      console.table(tabularData, properties);
    });
  },
  time(label) {
    return sync(() => console.time(label));
  },
  timeEnd(label) {
    return sync(() => console.timeEnd(label));
  },
  timeLog(label, ...args) {
    return sync(() => {
      console.timeLog(label, ...args);
    });
  },
  trace(...args) {
    return sync(() => {
      console.trace(...args);
    });
  },
  warn(...args) {
    return sync(() => {
      console.warn(...args);
    });
  },
  withGroup(self, options) {
    return acquireUseRelease(options?.collapsed ? sync(() => console.groupCollapsed(options?.label)) : sync(() => console.group(options?.label)), () => self, () => sync(() => console.groupEnd()));
  },
  withTime(self, label) {
    return acquireUseRelease(sync(() => console.time(label)), () => self, () => sync(() => console.timeEnd(label)));
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/random.mjs
var _a8;
var RandomSymbolKey = "@effect/io/Random";
var RandomTypeId = /* @__PURE__ */ Symbol.for(RandomSymbolKey);
var randomTag = /* @__PURE__ */ Tag(RandomTypeId);
var RandomImpl = class {
  constructor(seed) {
    this.seed = seed;
    this[_a8] = RandomTypeId;
    this.PRNG = new PCGRandom(seed);
  }
  next() {
    return sync(() => this.PRNG.number());
  }
  nextBoolean() {
    return map9(this.next(), (n) => n > 0.5);
  }
  nextInt() {
    return sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(min3, max5) {
    return map9(this.next(), (n) => (max5 - min3) * n + min3);
  }
  nextIntBetween(min3, max5) {
    return sync(() => this.PRNG.integer(max5 - min3) + min3);
  }
  shuffle(elements) {
    return shuffleWith(elements, (n) => this.nextIntBetween(0, n + 1));
  }
};
_a8 = RandomTypeId;
var shuffleWith = (elements, nextIntBounded) => {
  return suspend(() => flatMap7((buffer) => {
    const numbers = [];
    for (let i = buffer.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return as2(fromIterable5(buffer))(forEachSequentialDiscard((n) => map9((k) => swap(buffer, n - 1, k))(nextIntBounded(n)))(numbers));
  })(sync(() => Array.from(elements))));
};
var swap = (buffer, index1, index2) => {
  const tmp = buffer[index1];
  buffer[index1] = buffer[index2];
  buffer[index2] = tmp;
  return buffer;
};
var make20 = (seed) => new RandomImpl(seed);

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/tracer.mjs
var TracerTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Tracer");
var make21 = (options) => ({
  [TracerTypeId]: TracerTypeId,
  ...options
});
var tracerTag = /* @__PURE__ */ Tag(/* @__PURE__ */ Symbol.for("@effect/io/Tracer"));
var ids2 = /* @__PURE__ */ globalValue("@effect/io/Tracer/SpanId.ids", () => make8(0));
var NativeSpan = class {
  constructor(name, parent, context4, links, startTime) {
    this.name = name;
    this.parent = parent;
    this.context = context4;
    this.links = links;
    this.startTime = startTime;
    this._tag = "Span";
    this.traceId = "native";
    this.events = [];
    this.end = (endTime, exit3) => {
      this.status = {
        _tag: "Ended",
        endTime,
        exit: exit3,
        startTime: this.status.startTime
      };
    };
    this.attribute = (key2, value2) => {
      this.attributes.set(key2, value2);
    };
    this.event = (name2, startTime2, attributes) => {
      this.events.push([name2, startTime2, attributes ?? {}]);
    };
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = /* @__PURE__ */ new Map();
    this.spanId = `span${incrementAndGet(ids2)}`;
  }
};
var nativeTracer = /* @__PURE__ */ make21({
  span: (name, parent, context4, links, startTime) => new NativeSpan(name, parent, context4, links, startTime)
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/defaultServices.mjs
var liveServices = /* @__PURE__ */ add2(tracerTag, nativeTracer)(/* @__PURE__ */ add2(configProviderTag, fromEnv())(/* @__PURE__ */ add2(randomTag, make20(Math.random() * 4294967296 >>> 0))(/* @__PURE__ */ add2(consoleTag, defaultConsole)(/* @__PURE__ */ add2(clockTag, make16())(/* @__PURE__ */ empty3())))));
var currentServices = /* @__PURE__ */ fiberRefUnsafeMakeContext(liveServices);
var sleep = (duration) => {
  const decodedDuration = decode(duration);
  return clockWith((clock3) => clock3.sleep(decodedDuration));
};
var clockWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, clockTag)));
var currentTimeMillis = /* @__PURE__ */ clockWith((clock3) => clock3.currentTimeMillis);
var currentTimeNanos = /* @__PURE__ */ clockWith((clock3) => clock3.currentTimeNanos);
var withClock = /* @__PURE__ */ dual(2, (effect, value2) => fiberRefLocallyWith(currentServices, add2(clockTag, value2))(effect));
var withConfigProvider = /* @__PURE__ */ dual(2, (effect, value2) => fiberRefLocallyWith(currentServices, add2(configProviderTag, value2))(effect));
var configProviderWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, configProviderTag)));
var config = (config3) => configProviderWith((_) => _.load(config3));
var randomWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, randomTag)));
var tracerWith = (f) => fiberRefGetWith(currentServices, (services) => f(get3(services, tracerTag)));
var withTracer = /* @__PURE__ */ dual(2, (effect, value2) => fiberRefLocallyWith(currentServices, add2(tracerTag, value2))(effect));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Clock.mjs
var sleep2 = sleep;
var currentTimeMillis2 = currentTimeMillis;
var currentTimeNanos2 = currentTimeNanos;
var clockWith2 = clockWith;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberRefs.mjs
var _a9;
function unsafeMake4(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
var FiberRefsSym = /* @__PURE__ */ Symbol.for("@effect/io/FiberRefs");
var FiberRefsImpl = class {
  constructor(locals) {
    this.locals = locals;
    this[_a9] = FiberRefsSym;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
_a9 = FiberRefsSym;
var findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = void 0;
  while (ret === void 0) {
    if (isNonEmptyReadonlyArray(parentStack) && isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = headNonEmpty(parentStack)[0];
      const parentAncestors = tailNonEmpty(parentStack);
      const childFiberId = headNonEmpty(childStack)[0];
      const childRefValue = headNonEmpty(childStack)[1];
      const childAncestors = tailNonEmpty(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
var joinAs = /* @__PURE__ */ dual(3, (self, fiberId3, that) => {
  const parentFiberRefs = new Map(self.locals);
  for (const [fiberRef, childStack] of that.locals) {
    const childValue = headNonEmpty(childStack)[1];
    if (!equals(headNonEmpty(childStack)[0], fiberId3)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (equals(childValue, fiberRef.initial)) {
          continue;
        }
        parentFiberRefs.set(fiberRef, [[fiberId3, fiberRef.join(fiberRef.initial, childValue)]]);
        continue;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch11 = fiberRef.diff(ancestor, childValue);
        const oldValue = headNonEmpty(parentStack)[1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch11)(oldValue));
        if (!equals(oldValue, newValue)) {
          let newStack;
          const parentFiberId = headNonEmpty(parentStack)[0];
          if (equals(parentFiberId, fiberId3)) {
            newStack = prepend([parentFiberId, newValue])(tailNonEmpty(parentStack));
          } else {
            newStack = prepend([fiberId3, newValue])(parentStack);
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  }
  return new FiberRefsImpl(new Map(parentFiberRefs));
});
var forkAs = /* @__PURE__ */ dual(2, (self, childId) => {
  const map14 = /* @__PURE__ */ new Map();
  for (const [fiberRef, stack] of self.locals.entries()) {
    const oldValue = headNonEmpty(stack)[1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (equals(oldValue, newValue)) {
      map14.set(fiberRef, stack);
    } else {
      map14.set(fiberRef, prepend([childId, newValue])(stack));
    }
  }
  return new FiberRefsImpl(map14);
});
var fiberRefs = (self) => fromIterable6(self.locals.keys());
var setAll = (self) => forEachSequentialDiscard(fiberRefs(self), (fiberRef) => fiberRefSet(fiberRef, getOrDefault(self, fiberRef)));
var delete_ = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
var get9 = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return none2();
  }
  return some2(headNonEmpty(self.locals.get(fiberRef))[1]);
});
var getOrDefault = /* @__PURE__ */ dual(2, (self, fiberRef) => getOrElse(() => fiberRef.initial)(get9(self, fiberRef)));
var updatedAs = /* @__PURE__ */ dual(2, (self, {
  fiberId: fiberId3,
  fiberRef,
  value: value2
}) => {
  const oldStack = self.locals.has(fiberRef) ? self.locals.get(fiberRef) : empty();
  let newStack;
  if (isEmptyReadonlyArray(oldStack)) {
    newStack = of([fiberId3, value2]);
  } else {
    const [currentId, currentValue] = headNonEmpty(oldStack);
    if (equals(currentId, fiberId3)) {
      if (equals(currentValue, value2)) {
        return self;
      } else {
        newStack = prepend([fiberId3, value2])(tailNonEmpty(oldStack));
      }
    } else {
      newStack = prepend([fiberId3, value2])(oldStack);
    }
  }
  const locals = new Map(self.locals);
  return new FiberRefsImpl(locals.set(fiberRef, newStack));
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/FiberRefs.mjs
var forkAs2 = forkAs;
var joinAs2 = joinAs;
var setAll2 = setAll;
var updatedAs2 = updatedAs;
var unsafeMake5 = unsafeMake4;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberRefs/patch.mjs
var OP_EMPTY2 = "Empty";
var OP_ADD = "Add";
var OP_REMOVE = "Remove";
var OP_UPDATE = "Update";
var OP_AND_THEN = "AndThen";
var empty21 = {
  _tag: OP_EMPTY2
};
var diff7 = (oldValue, newValue) => {
  const missingLocals = new Map(oldValue.locals);
  let patch11 = empty21;
  for (const [fiberRef, pairs] of newValue.locals.entries()) {
    const newValue2 = headNonEmpty(pairs)[1];
    const old = missingLocals.get(fiberRef);
    if (old !== void 0) {
      const oldValue2 = headNonEmpty(old)[1];
      if (!equals(oldValue2, newValue2)) {
        patch11 = combine9({
          _tag: OP_UPDATE,
          fiberRef,
          patch: fiberRef.diff(oldValue2, newValue2)
        })(patch11);
      }
    } else {
      patch11 = combine9({
        _tag: OP_ADD,
        fiberRef,
        value: newValue2
      })(patch11);
    }
    missingLocals.delete(fiberRef);
  }
  for (const [fiberRef] of missingLocals.entries()) {
    patch11 = combine9({
      _tag: OP_REMOVE,
      fiberRef
    })(patch11);
  }
  return patch11;
};
var combine9 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: OP_AND_THEN,
  first: self,
  second: that
}));
var patch8 = /* @__PURE__ */ dual(3, (self, fiberId3, oldValue) => {
  let fiberRefs2 = oldValue;
  let patches = of(self);
  while (isNonEmptyReadonlyArray(patches)) {
    const head6 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head6._tag) {
      case OP_EMPTY2: {
        patches = tail;
        break;
      }
      case OP_ADD: {
        fiberRefs2 = updatedAs(fiberRefs2, {
          fiberId: fiberId3,
          fiberRef: head6.fiberRef,
          value: head6.value
        });
        patches = tail;
        break;
      }
      case OP_REMOVE: {
        fiberRefs2 = delete_(fiberRefs2, head6.fiberRef);
        patches = tail;
        break;
      }
      case OP_UPDATE: {
        const value2 = getOrDefault(fiberRefs2, head6.fiberRef);
        fiberRefs2 = updatedAs(fiberRefs2, {
          fiberId: fiberId3,
          fiberRef: head6.fiberRef,
          value: head6.fiberRef.patch(head6.patch)(value2)
        });
        patches = tail;
        break;
      }
      case OP_AND_THEN: {
        patches = prepend(head6.first)(prepend(head6.second)(tail));
        break;
      }
    }
  }
  return fiberRefs2;
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/label.mjs
var _a10;
var MetricLabelSymbolKey = "@effect/io/Metric/Label";
var MetricLabelTypeId = /* @__PURE__ */ Symbol.for(MetricLabelSymbolKey);
var MetricLabelImpl = class {
  constructor(key2, value2) {
    this.key = key2;
    this.value = value2;
    this[_a10] = MetricLabelTypeId;
  }
  [(_a10 = MetricLabelTypeId, symbol)]() {
    return combine(hash(this.value))(combine(hash(this.key))(hash(MetricLabelSymbolKey)));
  }
  [symbol2](that) {
    return isMetricLabel(that) && this.key === that.key && this.value === that.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make22 = (key2, value2) => {
  return new MetricLabelImpl(key2, value2);
};
var isMetricLabel = (u) => {
  return typeof u === "object" && u != null && MetricLabelTypeId in u;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/singleShotGen.mjs
var SingleShotGen = class _SingleShotGen {
  constructor(self) {
    this.self = self;
    this.called = false;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new _SingleShotGen(this.self);
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Logger/Level.mjs
var All = logLevelAll;
var Fatal = logLevelFatal;
var Error2 = logLevelError;
var Warning = logLevelWarning;
var Info = logLevelInfo;
var Debug = logLevelDebug;
var Trace = logLevelTrace;
var None4 = logLevelNone;
var Order2 = /* @__PURE__ */ mapInput2((level) => level.ordinal)(Order);
var greaterThan2 = /* @__PURE__ */ greaterThan(Order2);
var fromLiteral = (_) => {
  switch (_) {
    case "All": {
      return All;
    }
    case "Debug": {
      return Debug;
    }
    case "Error": {
      return Error2;
    }
    case "Fatal": {
      return Fatal;
    }
    case "Info": {
      return Info;
    }
    case "Trace": {
      return Trace;
    }
    case "None": {
      return None4;
    }
    case "Warning": {
      return Warning;
    }
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/logSpan.mjs
var make23 = (label, startTime) => ({
  label,
  startTime
});
var render = (now) => {
  return (self) => {
    const label = self.label.replace(/[\s="]/g, "_");
    return `${label}=${now - self.startTime}ms`;
  };
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Logger/Span.mjs
var make24 = make23;
var render2 = render;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/ref.mjs
var _a11;
var RefTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Ref");
var refVariance = {
  _A: (_) => _
};
var RefImpl = class {
  constructor(ref) {
    this.ref = ref;
    this[_a11] = refVariance;
  }
  modify(f) {
    return sync(() => {
      const current = get6(this.ref);
      const [b, a] = f(current);
      if (current !== a) {
        set3(a)(this.ref);
      }
      return b;
    });
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
_a11 = RefTypeId;
var unsafeMake6 = (value2) => new RefImpl(make8(value2));
var make25 = (value2) => sync(() => unsafeMake6(value2));
var get10 = (self) => self.modify((a) => [a, a]);
var set5 = /* @__PURE__ */ dual(2, (self, value2) => self.modify(() => [void 0, value2]));
var getAndSet = /* @__PURE__ */ dual(2, (self, value2) => self.modify((a) => [a, value2]));
var modify3 = /* @__PURE__ */ dual(2, (self, f) => self.modify(f));
var update4 = /* @__PURE__ */ dual(2, (self, f) => self.modify((a) => [void 0, f(a)]));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Ref.mjs
var make26 = make25;
var get11 = get10;
var getAndSet2 = getAndSet;
var modify4 = modify3;
var update5 = update4;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Tracer.mjs
var tracerWith2 = tracerWith;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/effect.mjs
var annotateLogs = /* @__PURE__ */ dual((args) => isEffect(args[0]), function() {
  const args = arguments;
  return fiberRefLocallyWith(args[0], currentLogAnnotations, typeof args[1] === "string" ? set2(args[1], args[2]) : (annotations) => Object.entries(args[1]).reduce((acc, [key2, value2]) => set2(acc, key2, value2), annotations));
});
var asSome = (self) => map9(self, some2);
var asSomeError = (self) => mapError(self, some2);
var asyncOption = (register, blockingOn = none4) => asyncEither((cb) => {
  const option6 = register(cb);
  switch (option6._tag) {
    case "None": {
      return left2(unit);
    }
    case "Some": {
      return right2(option6.value);
    }
  }
}, blockingOn);
var try_ = (arg) => {
  let evaluate;
  let onFailure = void 0;
  if (typeof arg === "function") {
    evaluate = arg;
  } else {
    evaluate = arg.try;
    onFailure = arg.catch;
  }
  return sync(() => {
    try {
      return evaluate();
    } catch (error2) {
      throw makeEffectError(fail(onFailure ? onFailure(error2) : error2));
    }
  });
};
var _catch = /* @__PURE__ */ dual(
  // @ts-expect-error
  3,
  (self, tag2, options) => catchAll(self, (e) => {
    if (typeof e === "object" && e != null && tag2 in e && e[tag2] === options.failure) {
      return options.onFailure(e);
    }
    return fail2(e);
  })
);
var catchAllDefect = /* @__PURE__ */ dual(2, (self, f) => catchAllCause(self, unified((cause3) => {
  const option6 = find(cause3, (_) => isDieType(_) ? some2(_) : none2());
  switch (option6._tag) {
    case "None": {
      return failCause(cause3);
    }
    case "Some": {
      return f(option6.value.defect);
    }
  }
})));
var catchSomeCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const option6 = f(cause3);
    switch (option6._tag) {
      case "None": {
        return failCause(cause3);
      }
      case "Some": {
        return option6.value;
      }
    }
  },
  onSuccess: succeed
}));
var catchSomeDefect = /* @__PURE__ */ dual(2, (self, pf) => catchAllCause(self, unified((cause3) => {
  const option6 = find(cause3, (_) => isDieType(_) ? some2(_) : none2());
  switch (option6._tag) {
    case "None": {
      return failCause(cause3);
    }
    case "Some": {
      const optionEffect = pf(option6.value.defect);
      return optionEffect._tag === "Some" ? optionEffect.value : failCause(cause3);
    }
  }
})));
var catchTag = /* @__PURE__ */ dual(3, (self, k, f) => catchAll(self, (e) => {
  if (isObject(e) && "_tag" in e && e["_tag"] === k) {
    return f(e);
  }
  return fail2(e);
}));
var catchTags = /* @__PURE__ */ dual(2, (self, cases) => catchAll(self, (e) => {
  const keys3 = Object.keys(cases);
  if (isObject(e) && "_tag" in e && keys3.includes(e["_tag"])) {
    return cases[e["_tag"]](e);
  }
  return fail2(e);
}));
var cause = (self) => matchCause(self, {
  onFailure: identity,
  onSuccess: () => empty16
});
var clockWith3 = clockWith2;
var clock = /* @__PURE__ */ clockWith3(succeed);
var delay = /* @__PURE__ */ dual(2, (self, duration) => zipRight(sleep2(duration), self));
var descriptorWith = (f) => withFiberRuntime((state, status) => f({
  id: state.id(),
  status,
  interruptors: interruptors(state.getFiberRef(currentInterruptedCause))
}));
var allowInterrupt = /* @__PURE__ */ descriptorWith((descriptor3) => size5(descriptor3.interruptors) > 0 ? interrupt2 : unit);
var descriptor = /* @__PURE__ */ descriptorWith(succeed);
var diffFiberRefs = (self) => summarized(self, getFiberRefs, diff7);
var Do = /* @__PURE__ */ succeed({});
var bind = /* @__PURE__ */ dual(3, (self, tag2, f) => flatMap7(self, (k) => map9(f(k), (a) => ({
  ...k,
  [tag2]: a
}))));
var bindTo = /* @__PURE__ */ dual(2, (self, tag2) => map9(self, (a) => ({
  [tag2]: a
})));
var bindValue = /* @__PURE__ */ dual(3, (self, tag2, f) => map9(self, (k) => ({
  ...k,
  [tag2]: f(k)
})));
var dropUntil = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping = succeed(false);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    dropping = flatMap7(dropping, (bool) => {
      if (bool) {
        builder.push(a);
        return succeed(true);
      }
      return predicate(a, index2);
    });
  }
  return map9(dropping, () => builder);
}));
var dropWhile = /* @__PURE__ */ dual(2, (elements, f) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping = succeed(true);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    dropping = flatMap7(dropping, (d) => map9(d ? f(a, index2) : succeed(false), (b) => {
      if (!b) {
        builder.push(a);
      }
      return b;
    }));
  }
  return map9(dropping, () => builder);
}));
var contextWith = (f) => map9(context(), f);
var eventually = (self) => orElse2(self, () => flatMap7(yieldNow(), () => eventually(self)));
var filterOrDie = /* @__PURE__ */ dual(3, (self, filter7, orDieWith3) => filterOrElse(self, filter7, () => dieSync(orDieWith3)));
var filterOrDieMessage = /* @__PURE__ */ dual(3, (self, filter7, message) => filterOrElse(self, filter7, () => dieMessage(message)));
var filterOrElse = /* @__PURE__ */ dual(3, (self, filter7, orElse7) => flatMap7(self, (a) => filter7(a) ? succeed(a) : orElse7(a)));
var filterOrFail = /* @__PURE__ */ dual(3, (self, filter7, orFailWith) => filterOrElse(self, filter7, (a) => failSync(() => orFailWith(a))));
var findFirst4 = /* @__PURE__ */ dual(2, (elements, f) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const next = iterator.next();
  if (!next.done) {
    return findLoop(iterator, 0, f, next.value);
  }
  return succeed(none2());
}));
var findLoop = (iterator, index2, f, value2) => flatMap7(f(value2, index2), (result) => {
  if (result) {
    return succeed(some2(value2));
  }
  const next = iterator.next();
  if (!next.done) {
    return findLoop(iterator, index2 + 1, f, next.value);
  }
  return succeed(none2());
});
var firstSuccessOf = (effects) => suspend(() => {
  const list = fromIterable5(effects);
  if (!isNonEmpty(list)) {
    return dieSync(() => IllegalArgumentException(`Received an empty collection of effects`));
  }
  return reduce(headNonEmpty2(list), (left3, right3) => orElse2(left3, () => right3))(tailNonEmpty2(list));
});
var flipWith = /* @__PURE__ */ dual(2, (self, f) => flip(f(flip(self))));
var match4 = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchEffect(self, {
  onFailure: (e) => succeed(onFailure(e)),
  onSuccess: (a) => succeed(onSuccess(a))
}));
var every3 = /* @__PURE__ */ dual(2, (elements, f) => suspend(() => forAllLoop(elements[Symbol.iterator](), 0, f)));
var forAllLoop = (iterator, index2, f) => {
  const next = iterator.next();
  return next.done ? succeed(true) : flatMap7(f(next.value, index2), (b) => b ? forAllLoop(iterator, index2 + 1, f) : succeed(b));
};
var forever = (self) => {
  const loop3 = flatMap7(flatMap7(self, () => yieldNow()), () => loop3);
  return loop3;
};
var EffectGen = class {
  constructor(value2) {
    this.value = value2;
  }
  [Symbol.iterator]() {
    return new SingleShotGen(this);
  }
};
var adapter = function() {
  let x = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    x = arguments[i](x);
  }
  return new EffectGen(x);
};
var gen = (f) => suspend(() => {
  const iterator = f(adapter);
  const state = iterator.next();
  const run = (state2) => state2.done ? succeed(state2.value) : flatMap7((val) => run(iterator.next(val)))(state2.value.value);
  return run(state);
});
var getFiberRefs = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.unsafeGetFiberRefs()));
var head4 = (self) => matchEffect(self, {
  onFailure: (e) => fail2(some2(e)),
  onSuccess: (as4) => {
    const iterator = as4[Symbol.iterator]();
    const next = iterator.next();
    if (next.done) {
      return fail2(none2());
    }
    return succeed(next.value);
  }
});
var ignore = (self) => match4(self, {
  onFailure: constVoid,
  onSuccess: constVoid
});
var ignoreLogged = (self) => matchCauseEffect(self, {
  onFailure: (cause3) => logDebug(cause3, "An error was silently ignored because it is not anticipated to be useful"),
  onSuccess: () => unit
});
var inheritFiberRefs = (childFiberRefs) => updateFiberRefs((parentFiberId, parentFiberRefs) => joinAs2(parentFiberRefs, parentFiberId, childFiberRefs));
var isFailure2 = (self) => match4(self, {
  onFailure: constTrue,
  onSuccess: constFalse
});
var isSuccess = (self) => match4(self, {
  onFailure: constFalse,
  onSuccess: constTrue
});
var iterate = (initial, options) => suspend(() => {
  if (options.while(initial)) {
    return flatMap7(options.body(initial), (z2) => iterate(z2, options));
  }
  return succeed(initial);
});
var logWithLevel = (level) => (messageOrCause, supplementary) => {
  const levelOption = fromNullable(level);
  let message;
  let cause3;
  if (isCause(messageOrCause)) {
    cause3 = messageOrCause;
    message = supplementary ?? "";
  } else {
    message = messageOrCause;
    cause3 = supplementary ?? empty16;
  }
  return withFiberRuntime((fiberState) => {
    fiberState.log(message, cause3, levelOption);
    return unit;
  });
};
var log = /* @__PURE__ */ logWithLevel();
var logTrace = /* @__PURE__ */ logWithLevel(Trace);
var logDebug = /* @__PURE__ */ logWithLevel(Debug);
var logInfo = /* @__PURE__ */ logWithLevel(Info);
var logWarning = /* @__PURE__ */ logWithLevel(Warning);
var logError = /* @__PURE__ */ logWithLevel(Error2);
var logFatal = /* @__PURE__ */ logWithLevel(Fatal);
var withLogSpan = /* @__PURE__ */ dual(2, (effect, label) => flatMap7(currentTimeMillis2, (now) => fiberRefLocallyWith(effect, currentLogSpan, prepend3(make24(label, now)))));
var logAnnotations = /* @__PURE__ */ fiberRefGet(currentLogAnnotations);
var loop = (initial, options) => options.discard ? loopDiscard(initial, options.while, options.step, options.body) : map9(loopInternal(initial, options.while, options.step, options.body), (x) => Array.from(x));
var loopInternal = (initial, cont, inc, body) => suspend(() => cont(initial) ? flatMap7(body(initial), (a) => map9(loopInternal(inc(initial), cont, inc, body), prepend3(a))) : sync(() => empty15()));
var loopDiscard = (initial, cont, inc, body) => suspend(() => cont(initial) ? flatMap7(body(initial), () => loopDiscard(inc(initial), cont, inc, body)) : unit);
var mapAccum2 = /* @__PURE__ */ dual(3, (elements, zero2, f) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let result = succeed(zero2);
  let next;
  let i = 0;
  while (!(next = iterator.next()).done) {
    const index2 = i++;
    result = flatMap7(result, (state) => map9(f(state, next.value, index2), ([z, b]) => {
      builder.push(b);
      return z;
    }));
  }
  return map9(result, (z) => [z, builder]);
}));
var mapErrorCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (c) => failCauseSync(() => f(c)),
  onSuccess: succeed
}));
var memoize = (self) => flatMap7((deferred) => map9((complete3) => zipRight(complete3, flatMap7(([patch11, a]) => as2(patchFiberRefs(patch11), a))(deferredAwait(deferred))))(once(intoDeferred(deferred)(diffFiberRefs(self)))))(deferredMake());
var merge5 = (self) => matchEffect(self, {
  onFailure: (e) => succeed(e),
  onSuccess: succeed
});
var negate = (self) => map9(self, (b) => !b);
var none6 = (self) => matchEffect(self, {
  onFailure: (e) => fail2(some2(e)),
  onSuccess: (option6) => {
    switch (option6._tag) {
      case "None": {
        return unit;
      }
      case "Some": {
        return fail2(none2());
      }
    }
  }
});
var once = (self) => map9(make26(true), (ref) => asUnit(whenEffect(self, getAndSet2(ref, false))));
var option2 = (self) => matchEffect(self, {
  onFailure: () => succeed(none2()),
  onSuccess: (a) => succeed(some2(a))
});
var orElseFail = /* @__PURE__ */ dual(2, (self, evaluate) => orElse2(self, () => failSync(evaluate)));
var orElseSucceed = /* @__PURE__ */ dual(2, (self, evaluate) => orElse2(self, () => sync(evaluate)));
var parallelErrors = (self) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const errors = Array.from(failures(cause3));
    return errors.length === 0 ? failCause(cause3) : fail2(errors);
  },
  onSuccess: succeed
});
var patchFiberRefs = (patch11) => updateFiberRefs((fiberId3, fiberRefs2) => patch8(fiberId3, fiberRefs2)(patch11));
var promise = (evaluate) => evaluate.length >= 1 ? async((resolve, signal) => {
  evaluate(signal).then((a) => resolve(exitSucceed(a))).catch((e) => resolve(exitDie(e)));
}) : async((resolve) => {
  ;
  evaluate().then((a) => resolve(exitSucceed(a))).catch((e) => resolve(exitDie(e)));
});
var provideService = /* @__PURE__ */ dual(3, (self, tag2, service) => provideServiceEffect(self, tag2, succeed(service)));
var provideServiceEffect = /* @__PURE__ */ dual(3, (self, tag2, effect) => contextWithEffect((env) => flatMap7(effect, (service) => provideContext(self, add2(tag2, service)(env)))));
var random2 = /* @__PURE__ */ randomWith(succeed);
var reduce8 = /* @__PURE__ */ dual(3, (elements, zero2, f) => fromIterable(elements).reduce((acc, el, i) => flatMap7(acc, (a) => f(a, el, i)), succeed(zero2)));
var reduceRight2 = /* @__PURE__ */ dual(3, (elements, zero2, f) => fromIterable(elements).reduceRight((acc, el, i) => flatMap7(acc, (a) => f(el, a, i)), succeed(zero2)));
var reduceWhile = /* @__PURE__ */ dual(3, (elements, zero2, options) => flatMap7(sync(() => elements[Symbol.iterator]()), (iterator) => reduceWhileLoop(iterator, 0, zero2, options.while, options.body)));
var reduceWhileLoop = (iterator, index2, state, predicate, f) => {
  const next = iterator.next();
  if (!next.done && predicate(state)) {
    return flatMap7(f(state, next.value, index2), (nextState) => reduceWhileLoop(iterator, index2 + 1, nextState, predicate, f));
  }
  return succeed(state);
};
var repeatN = /* @__PURE__ */ dual(2, (self, n) => suspend(() => repeatNLoop(self, n)));
var repeatNLoop = (self, n) => flatMap7(self, (a) => n <= 0 ? succeed(a) : zipRight(yieldNow(), repeatNLoop(self, n - 1)));
var sandbox = (self) => matchCauseEffect(self, {
  onFailure: fail2,
  onSuccess: succeed
});
var setFiberRefs = (fiberRefs2) => suspend(() => setAll2(fiberRefs2));
var sleep3 = sleep2;
var some4 = (self) => matchEffect(self, {
  onFailure: (e) => fail2(some2(e)),
  onSuccess: (option6) => {
    switch (option6._tag) {
      case "None": {
        return fail2(none2());
      }
      case "Some": {
        return succeed(option6.value);
      }
    }
  }
});
var succeedNone = /* @__PURE__ */ succeed(/* @__PURE__ */ none2());
var succeedSome = (value2) => succeed(some2(value2));
var summarized = /* @__PURE__ */ dual(3, (self, summary5, f) => flatMap7(summary5, (start3) => flatMap7(self, (value2) => map9(summary5, (end3) => [f(start3, end3), value2]))));
var tagMetrics = /* @__PURE__ */ dual(3, (self, key2, value2) => labelMetrics(self, [make22(key2, value2)]));
var labelMetrics = /* @__PURE__ */ dual(2, (self, labels) => labelMetricsSet(self, fromIterable6(labels)));
var labelMetricsSet = /* @__PURE__ */ dual(2, (self, labels) => fiberRefLocallyWith(currentMetricLabels, (set6) => union4(labels)(set6))(self));
var takeUntil = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let effect = succeed(false);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    effect = flatMap7(effect, (bool) => {
      if (bool) {
        return succeed(true);
      }
      builder.push(a);
      return predicate(a, index2);
    });
  }
  return map9(effect, () => builder);
}));
var takeWhile = /* @__PURE__ */ dual(2, (elements, predicate) => suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let taking = succeed(true);
  let i = 0;
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    const index2 = i++;
    taking = flatMap7(taking, (taking2) => map9((bool) => {
      if (bool) {
        builder.push(a);
      }
      return bool;
    })(taking2 ? predicate(a, index2) : succeed(false)));
  }
  return map9(taking, () => builder);
}));
var tapBoth = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either5 = failureOrCause(cause3);
    switch (either5._tag) {
      case "Left": {
        return zipRight(onFailure(either5.left), failCause(cause3));
      }
      case "Right": {
        return failCause(cause3);
      }
    }
  },
  onSuccess: (a) => as2(onSuccess(a), a)
}));
var tapDefect = /* @__PURE__ */ dual(2, (self, f) => catchAllCause(self, (cause3) => match2(keepDefects(cause3), {
  onNone: () => failCause(cause3),
  onSome: (a) => zipRight(f(a), failCause(cause3))
})));
var tapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => {
    const either5 = failureOrCause(cause3);
    switch (either5._tag) {
      case "Left": {
        return zipRight(f(either5.left), failCause(cause3));
      }
      case "Right": {
        return failCause(cause3);
      }
    }
  },
  onSuccess: succeed
}));
var tapErrorTag = /* @__PURE__ */ dual(3, (self, k, f) => tapError(self, (e) => {
  if (isObject(e) && "_tag" in e && e["_tag"] === k) {
    return f(e);
  }
  return unit;
}));
var tapErrorCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause3) => zipRight(f(cause3), failCause(cause3)),
  onSuccess: succeed
}));
var timed = (self) => timedWith(self, currentTimeNanos2);
var timedWith = /* @__PURE__ */ dual(2, (self, nanos2) => summarized(self, nanos2, (start3, end3) => nanos(end3 - start3)));
var tracerWith3 = tracerWith2;
var tracer = /* @__PURE__ */ tracerWith3(succeed);
var tryPromise = (arg) => {
  let evaluate;
  let catcher = void 0;
  if (typeof arg === "function") {
    evaluate = arg;
  } else {
    evaluate = arg.try;
    catcher = arg.catch;
  }
  if (evaluate.length >= 1) {
    return suspend(() => {
      const controller = new AbortController();
      return flatMap7(try_(() => evaluate(controller.signal)), (promise3) => async((resolve) => {
        promise3.then((a) => resolve(exitSucceed(a))).catch((e) => resolve(exitFail(catcher ? catcher(e) : e)));
        return sync(() => controller.abort());
      }));
    });
  }
  return flatMap7(try_(arg), (promise3) => async((resolve) => {
    promise3.then((a) => resolve(exitSucceed(a))).catch((e) => resolve(exitFail(catcher ? catcher(e) : e)));
  }));
};
var tryMap = /* @__PURE__ */ dual(2, (self, options) => flatMap7(self, (a) => try_({
  try: () => options.try(a),
  catch: options.catch
})));
var tryMapPromise = /* @__PURE__ */ dual(2, (self, options) => flatMap7(self, (a) => tryPromise({
  try: options.try.length >= 1 ? (signal) => options.try(a, signal) : () => options.try(a),
  catch: options.catch
})));
var unless = /* @__PURE__ */ dual(2, (self, predicate) => suspend(() => predicate() ? succeedNone : asSome(self)));
var unlessEffect = /* @__PURE__ */ dual(2, (self, predicate) => flatMap7(predicate, (b) => b ? succeedNone : asSome(self)));
var unsandbox = (self) => mapErrorCause(self, flatten3);
var updateFiberRefs = (f) => withFiberRuntime((state) => {
  state.setFiberRefs(f(state.id(), state.unsafeGetFiberRefs()));
  return unit;
});
var updateService = /* @__PURE__ */ dual(3, (self, tag2, f) => mapInputContext(self, (context4) => add2(context4, tag2, f(unsafeGet3(context4, tag2)))));
var when = /* @__PURE__ */ dual(2, (self, predicate) => suspend(() => predicate() ? map9(self, some2) : succeed(none2())));
var whenFiberRef = /* @__PURE__ */ dual(3, (self, fiberRef, predicate) => flatMap7(fiberRefGet(fiberRef), (s) => predicate(s) ? map9(self, (a) => [s, some2(a)]) : succeed([s, none2()])));
var whenRef = /* @__PURE__ */ dual(3, (self, ref, predicate) => flatMap7(get11(ref), (s) => predicate(s) ? map9(self, (a) => [s, some2(a)]) : succeed([s, none2()])));
var withMetric = /* @__PURE__ */ dual(2, (self, metric) => metric(self));
var serviceFunctionEffect = (service, f) => (...args) => flatMap7(service, (a) => f(a)(...args));
var serviceFunction = (service, f) => (...args) => map9(service, (a) => f(a)(...args));
var serviceFunctions = (tag2) => new Proxy({}, {
  get(_target, prop, _receiver) {
    return (...args) => flatMap7(tag2, (s) => s[prop](...args));
  }
});
var serviceConstants = (tag2) => new Proxy({}, {
  get(_target, prop, _receiver) {
    return flatMap7(tag2, (s) => s[prop]);
  }
});
var serviceMembers = (tag2) => ({
  functions: serviceFunctions(tag2),
  constants: serviceConstants(tag2)
});
var annotateCurrentSpan = function() {
  const args = arguments;
  return flatMap7(currentSpan, (span) => span._tag === "Some" ? sync(() => {
    if (typeof args[0] === "string") {
      span.value.attribute(args[0], args[1]);
    } else {
      for (const key2 in args[0]) {
        span.value.attribute(key2, args[0][key2]);
      }
    }
  }) : unit);
};
var annotateSpans = /* @__PURE__ */ dual((args) => isEffect(args[0]), function() {
  const args = arguments;
  return fiberRefLocallyWith(args[0], currentTracerSpanAnnotations, typeof args[1] === "string" ? set2(args[1], args[2]) : (annotations) => Object.entries(args[1]).reduce((acc, [key2, value2]) => set2(acc, key2, value2), annotations));
});
var currentParentSpan = /* @__PURE__ */ map9(/* @__PURE__ */ fiberRefGet(currentTracerSpan), head3);
var currentSpan = /* @__PURE__ */ map9(/* @__PURE__ */ fiberRefGet(currentTracerSpan), /* @__PURE__ */ findFirst3((span) => span._tag === "Span"));
var bigint0 = /* @__PURE__ */ BigInt(0);
var currentTimeNanosTracing = /* @__PURE__ */ fiberRefGetWith(currentTracerTimingEnabled, (enabled2) => enabled2 ? currentTimeNanos2 : succeed(bigint0));
var linkSpans = /* @__PURE__ */ dual((args) => isEffect(args[0]), (self, span, attributes) => fiberRefLocallyWith(self, currentTracerSpanLinks, append2({
  _tag: "SpanLink",
  span,
  attributes: attributes ?? {}
})));
var makeSpan = (name, options) => tracerWith3((tracer3) => flatMap7(options?.parent ? succeedSome(options.parent) : options?.root ? succeedNone : currentParentSpan, (parent) => flatMap7(fiberRefGet(currentTracerSpanAnnotations), (annotations) => flatMap7(fiberRefGet(currentTracerSpanLinks), (links) => flatMap7(currentTimeNanosTracing, (startTime) => sync(() => {
  const linksArray = options?.links ? [...toReadonlyArray(links), ...options.links] : toReadonlyArray(links);
  const span = tracer3.span(name, parent, options?.context ?? empty3(), linksArray, startTime);
  forEach3(annotations, (value2, key2) => span.attribute(key2, value2));
  Object.entries(options?.attributes ?? {}).forEach(([k, v]) => span.attribute(k, v));
  return span;
}))))));
var spanAnnotations = /* @__PURE__ */ fiberRefGet(currentTracerSpanAnnotations);
var spanLinks = /* @__PURE__ */ fiberRefGet(currentTracerSpanLinks);
var useSpan = (name, ...args) => {
  const options = args.length === 1 ? void 0 : args[0];
  const evaluate = args[args.length - 1];
  return acquireUseRelease(makeSpan(name, options), evaluate, (span, exit3) => flatMap7(currentTimeNanosTracing, (endTime) => sync(() => span.end(endTime, exit3))));
};
var withParentSpan = /* @__PURE__ */ dual(2, (self, span) => fiberRefLocallyWith(self, currentTracerSpan, prepend3(span)));
var withSpan = /* @__PURE__ */ dual((args) => typeof args[0] !== "string", (self, name, options) => useSpan(name, options ?? {}, (span) => withParentSpan(self, span)));
var fromNullable2 = (evaluate) => suspend(() => {
  const a = evaluate();
  if (a === null || a === void 0) {
    return fail2(NoSuchElementException());
  }
  return succeed(a);
});
var optionFromOptional = (self) => catchAll(map9(self, some2), (error2) => isNoSuchElementException(error2) ? succeedNone : fail2(error2));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberStatus.mjs
var _a12;
var _b6;
var _c4;
var FiberStatusSymbolKey = "@effect/io/Fiber/Status";
var FiberStatusTypeId = /* @__PURE__ */ Symbol.for(FiberStatusSymbolKey);
var OP_DONE = "Done";
var OP_RUNNING = "Running";
var OP_SUSPENDED = "Suspended";
var Done = class {
  constructor() {
    this[_a12] = FiberStatusTypeId;
    this._tag = OP_DONE;
  }
  [(_a12 = FiberStatusTypeId, symbol)]() {
    return combine(hash(this._tag))(hash(FiberStatusSymbolKey));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_DONE;
  }
};
var Running = class {
  constructor(runtimeFlags3) {
    this.runtimeFlags = runtimeFlags3;
    this[_b6] = FiberStatusTypeId;
    this._tag = OP_RUNNING;
  }
  [(_b6 = FiberStatusTypeId, symbol)]() {
    return combine(hash(this.runtimeFlags))(combine(hash(this._tag))(hash(FiberStatusSymbolKey)));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
};
var Suspended = class {
  constructor(runtimeFlags3, blockingOn) {
    this.runtimeFlags = runtimeFlags3;
    this.blockingOn = blockingOn;
    this[_c4] = FiberStatusTypeId;
    this._tag = OP_SUSPENDED;
  }
  [(_c4 = FiberStatusTypeId, symbol)]() {
    return combine(hash(this.blockingOn))(combine(hash(this.runtimeFlags))(combine(hash(this._tag))(hash(FiberStatusSymbolKey))));
  }
  [symbol2](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && equals(this.blockingOn, that.blockingOn);
  }
};
var done3 = /* @__PURE__ */ new Done();
var running = (runtimeFlags3) => new Running(runtimeFlags3);
var suspended = (runtimeFlags3, blockingOn) => new Suspended(runtimeFlags3, blockingOn);
var isFiberStatus = (u) => typeof u === "object" && u != null && FiberStatusTypeId in u;
var isDone = (self) => self._tag === OP_DONE;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Fiber/Status.mjs
var done4 = done3;
var running2 = running;
var suspended2 = suspended;
var isDone2 = isDone;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/FiberRefs/Patch.mjs
var diff8 = diff7;
var patch9 = patch8;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/completedRequestMap.mjs
var currentRequestMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentRequestMap"), () => fiberRefUnsafeMake(/* @__PURE__ */ new Map()));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/concurrency.mjs
var match5 = (options, sequential3, unbounded2, bounded) => {
  switch (options?.concurrency) {
    case void 0: {
      return sequential3();
    }
    case "unbounded": {
      return unbounded2();
    }
    case "inherit": {
      return fiberRefGetWith(currentConcurrency, (concurrency) => concurrency === "unbounded" ? unbounded2() : concurrency > 1 ? bounded(concurrency) : sequential3());
    }
    default: {
      return options.concurrency > 1 ? bounded(options.concurrency) : sequential3();
    }
  }
};
var matchSimple = (options, sequential3, concurrent) => {
  switch (options?.concurrency) {
    case void 0: {
      return sequential3();
    }
    case "unbounded": {
      return concurrent();
    }
    case "inherit": {
      return fiberRefGetWith(currentConcurrency, (concurrency) => concurrency === "unbounded" ? concurrent() : concurrency > 1 ? concurrent() : sequential3());
    }
    default: {
      return options.concurrency > 1 ? concurrent() : sequential3();
    }
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/executionStrategy.mjs
var OP_SEQUENTIAL2 = "Sequential";
var OP_PARALLEL2 = "Parallel";
var sequential2 = {
  _tag: OP_SEQUENTIAL2
};
var parallel2 = {
  _tag: OP_PARALLEL2
};
var isSequential = (self) => self._tag === OP_SEQUENTIAL2;
var isParallel = (self) => self._tag === OP_PARALLEL2;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberMessage.mjs
var OP_INTERRUPT_SIGNAL = "InterruptSignal";
var OP_STATEFUL = "Stateful";
var OP_RESUME = "Resume";
var OP_YIELD_NOW = "YieldNow";
var interruptSignal = (cause3) => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause: cause3
});
var stateful = (onFiber) => ({
  _tag: OP_STATEFUL,
  onFiber
});
var resume = (effect) => ({
  _tag: OP_RESUME,
  effect
});
var yieldNow2 = () => ({
  _tag: OP_YIELD_NOW
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberScope.mjs
var _a13;
var _b7;
var FiberScopeSymbolKey = "@effect/io/Fiber/Scope";
var FiberScopeTypeId = /* @__PURE__ */ Symbol.for(FiberScopeSymbolKey);
var Global = class {
  constructor() {
    this[_a13] = FiberScopeTypeId;
    this.fiberId = none4;
    this.roots = /* @__PURE__ */ new Set();
  }
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.unsafeAddObserver(() => {
      this.roots.delete(child);
    });
  }
};
_a13 = FiberScopeTypeId;
var Local = class {
  constructor(fiberId3, parent) {
    this.fiberId = fiberId3;
    this.parent = parent;
    this[_b7] = FiberScopeTypeId;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(stateful((parentFiber) => {
      parentFiber.addChild(child);
      child.unsafeAddObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
};
_b7 = FiberScopeTypeId;
var unsafeMake7 = (fiber) => {
  return new Local(fiber.id(), fiber);
};
var globalScope = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberScope/Global"), () => new Global());

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiber.mjs
var FiberSymbolKey = "@effect/io/Fiber";
var FiberTypeId = /* @__PURE__ */ Symbol.for(FiberSymbolKey);
var fiberVariance = {
  _E: (_) => _,
  _A: (_) => _
};
var fiberProto = {
  [FiberTypeId]: fiberVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var RuntimeFiberSymbolKey = "@effect/io/Fiber";
var RuntimeFiberTypeId = /* @__PURE__ */ Symbol.for(RuntimeFiberSymbolKey);
var _await2 = (self) => self.await();
var inheritAll = (self) => self.inheritAll();
var interruptAsFork = /* @__PURE__ */ dual(2, (self, fiberId3) => self.interruptAsFork(fiberId3));
var join2 = (self) => zipLeft(flatten5(self.await()), self.inheritAll());
var never2 = {
  ...fiberProto,
  id: () => none4,
  await: () => never,
  children: () => succeed([]),
  inheritAll: () => never,
  poll: () => succeed(none2()),
  interruptAsFork: () => never
};
var currentFiberURI = "@effect/io/Fiber/Current";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/logger.mjs
var LoggerSymbolKey = "@effect/io/Logger";
var LoggerTypeId = /* @__PURE__ */ Symbol.for(LoggerSymbolKey);
var loggerVariance = {
  _Message: (_) => _,
  _Output: (_) => _
};
var makeLogger = (log3) => ({
  [LoggerTypeId]: loggerVariance,
  log: log3,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var none7 = {
  [LoggerTypeId]: loggerVariance,
  log: constVoid,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var stringLogger = /* @__PURE__ */ makeLogger(({
  annotations,
  cause: cause3,
  date: date4,
  fiberId: fiberId3,
  logLevel: logLevel3,
  message,
  spans
}) => {
  const nowMillis = date4.getTime();
  const outputArray = [`timestamp=${date4.toISOString()}`, `level=${logLevel3.label}`, `fiber=${threadName(fiberId3)}`];
  let output = outputArray.join(" ");
  const stringMessage = serializeUnknown(message);
  if (stringMessage.length > 0) {
    output = output + " message=";
    output = appendQuoted(stringMessage, output);
  }
  if (cause3 != null && cause3 != empty16) {
    output = output + " cause=";
    output = appendQuoted(pretty(cause3), output);
  }
  if (isCons(spans)) {
    output = output + " ";
    let first = true;
    for (const span of spans) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + render2(nowMillis)(span);
    }
  }
  if (size3(annotations) > 0) {
    output = output + " ";
    let first = true;
    for (const [key2, value2] of annotations) {
      if (first) {
        first = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key2);
      output = output + "=";
      output = appendQuoted(String(value2), output);
    }
  }
  return output;
});
var serializeUnknown = (u) => {
  try {
    return typeof u === "object" ? JSON.stringify(u) : String(u);
  } catch (_) {
    return String(u);
  }
};
var escapeDoubleQuotes = (str) => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
var textOnly = /^[^\s"=]+$/;
var appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
var filterKeyName = (key2) => key2.replace(/[\s="]/g, "_");

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/boundaries.mjs
var _a14;
var MetricBoundariesSymbolKey = "@effect/io/Metric/Boundaries";
var MetricBoundariesTypeId = /* @__PURE__ */ Symbol.for(MetricBoundariesSymbolKey);
var MetricBoundariesImpl = class {
  constructor(values3) {
    this.values = values3;
    this[_a14] = MetricBoundariesTypeId;
  }
  [(_a14 = MetricBoundariesTypeId, symbol)]() {
    return combine(hash(this.values))(hash(MetricBoundariesSymbolKey));
  }
  [symbol2](u) {
    return isMetricBoundaries(u) && equals(this.values, u.values);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isMetricBoundaries = (u) => {
  return typeof u === "object" && u != null && MetricBoundariesTypeId in u;
};
var fromChunk = (chunk4) => {
  const values3 = dedupe2(appendAll(of2(Number.POSITIVE_INFINITY))(chunk4));
  return new MetricBoundariesImpl(values3);
};
var exponential = (options) => fromChunk(unsafeFromArray(makeBy(options.count - 1, (i) => options.start * Math.pow(options.factor, i))));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/keyType.mjs
var _a15;
var _b8;
var _c5;
var _d2;
var _e;
var _f;
var _g;
var _h;
var _j;
var _k;
var MetricKeyTypeSymbolKey = "@effect/io/Metric/KeyType";
var MetricKeyTypeTypeId = /* @__PURE__ */ Symbol.for(MetricKeyTypeSymbolKey);
var CounterKeyTypeSymbolKey = "effect/io/Metric/KeyType/Counter";
var CounterKeyTypeTypeId = /* @__PURE__ */ Symbol.for(CounterKeyTypeSymbolKey);
var FrequencyKeyTypeSymbolKey = "effect/io/Metric/KeyType/Frequency";
var FrequencyKeyTypeTypeId = /* @__PURE__ */ Symbol.for(FrequencyKeyTypeSymbolKey);
var GaugeKeyTypeSymbolKey = "effect/io/Metric/KeyType/Gauge";
var GaugeKeyTypeTypeId = /* @__PURE__ */ Symbol.for(GaugeKeyTypeSymbolKey);
var HistogramKeyTypeSymbolKey = "effect/io/Metric/KeyType/Histogram";
var HistogramKeyTypeTypeId = /* @__PURE__ */ Symbol.for(HistogramKeyTypeSymbolKey);
var SummaryKeyTypeSymbolKey = "effect/io/Metric/KeyType/Summary";
var SummaryKeyTypeTypeId = /* @__PURE__ */ Symbol.for(SummaryKeyTypeSymbolKey);
var metricKeyTypeVariance = {
  _In: (_) => _,
  _Out: (_) => _
};
var CounterKeyType = class {
  constructor() {
    this[_a15] = metricKeyTypeVariance;
    this[_b8] = CounterKeyTypeTypeId;
  }
  [(_a15 = MetricKeyTypeTypeId, _b8 = CounterKeyTypeTypeId, symbol)]() {
    return hash(CounterKeyTypeSymbolKey);
  }
  [symbol2](that) {
    return isCounterKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var FrequencyKeyType = class {
  constructor() {
    this[_c5] = metricKeyTypeVariance;
    this[_d2] = FrequencyKeyTypeTypeId;
  }
  [(_c5 = MetricKeyTypeTypeId, _d2 = FrequencyKeyTypeTypeId, symbol)]() {
    return hash(FrequencyKeyTypeSymbolKey);
  }
  [symbol2](that) {
    return isFrequencyKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var GaugeKeyType = class {
  constructor() {
    this[_e] = metricKeyTypeVariance;
    this[_f] = GaugeKeyTypeTypeId;
  }
  [(_e = MetricKeyTypeTypeId, _f = GaugeKeyTypeTypeId, symbol)]() {
    return hash(GaugeKeyTypeSymbolKey);
  }
  [symbol2](that) {
    return isGaugeKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var HistogramKeyType = class {
  constructor(boundaries) {
    this.boundaries = boundaries;
    this[_g] = metricKeyTypeVariance;
    this[_h] = HistogramKeyTypeTypeId;
  }
  [(_g = MetricKeyTypeTypeId, _h = HistogramKeyTypeTypeId, symbol)]() {
    return combine(hash(this.boundaries))(hash(HistogramKeyTypeSymbolKey));
  }
  [symbol2](that) {
    return isHistogramKey(that) && equals(this.boundaries, that.boundaries);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var SummaryKeyType = class {
  constructor(maxAge, maxSize, error2, quantiles) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
    this.error = error2;
    this.quantiles = quantiles;
    this[_j] = metricKeyTypeVariance;
    this[_k] = SummaryKeyTypeTypeId;
  }
  [(_j = MetricKeyTypeTypeId, _k = SummaryKeyTypeTypeId, symbol)]() {
    return combine(hash(this.quantiles))(combine(hash(this.error))(combine(hash(this.maxSize))(combine(hash(this.maxAge))(hash(SummaryKeyTypeSymbolKey)))));
  }
  [symbol2](that) {
    return isSummaryKey(that) && equals(this.maxAge, that.maxAge) && this.maxSize === that.maxSize && this.error === that.error && equals(this.quantiles, that.quantiles);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var counter = /* @__PURE__ */ new CounterKeyType();
var histogram = (boundaries) => {
  return new HistogramKeyType(boundaries);
};
var isCounterKey = (u) => {
  return typeof u === "object" && u != null && CounterKeyTypeTypeId in u;
};
var isFrequencyKey = (u) => {
  return typeof u === "object" && u != null && FrequencyKeyTypeTypeId in u;
};
var isGaugeKey = (u) => {
  return typeof u === "object" && u != null && GaugeKeyTypeTypeId in u;
};
var isHistogramKey = (u) => {
  return typeof u === "object" && u != null && HistogramKeyTypeTypeId in u;
};
var isSummaryKey = (u) => {
  return typeof u === "object" && u != null && SummaryKeyTypeTypeId in u;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/key.mjs
var _a16;
var MetricKeySymbolKey = "@effect/io/Metric/Key";
var MetricKeyTypeId = /* @__PURE__ */ Symbol.for(MetricKeySymbolKey);
var metricKeyVariance = {
  _Type: (_) => _
};
var MetricKeyImpl = class {
  constructor(name, keyType, description2, tags2 = empty12()) {
    this.name = name;
    this.keyType = keyType;
    this.description = description2;
    this.tags = tags2;
    this[_a16] = metricKeyVariance;
  }
  [(_a16 = MetricKeyTypeId, symbol)]() {
    return combine(hash(this.tags))(combine(hash(this.description))(combine(hash(this.keyType))(hash(this.name))));
  }
  [symbol2](u) {
    return isMetricKey(u) && this.name === u.name && equals(this.keyType, u.keyType) && equals(this.description, u.description) && equals(this.tags, u.tags);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isMetricKey = (u) => typeof u === "object" && u != null && MetricKeyTypeId in u;
var counter2 = (name, description2) => new MetricKeyImpl(name, counter, fromNullable(description2));
var histogram2 = (name, boundaries, description2) => new MetricKeyImpl(name, histogram(boundaries), fromNullable(description2));
var taggedWithLabelSet = /* @__PURE__ */ dual(2, (self, extraTags) => size5(extraTags) === 0 ? self : new MetricKeyImpl(self.name, self.keyType, self.description, union4(extraTags)(self.tags)));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/state.mjs
var _a17;
var _b9;
var _c6;
var _d3;
var _e2;
var _f2;
var _g2;
var _h2;
var _j2;
var _k2;
var MetricStateSymbolKey = "@effect/io/Metric/State";
var MetricStateTypeId = /* @__PURE__ */ Symbol.for(MetricStateSymbolKey);
var CounterStateSymbolKey = "effect/io/Metric/State/Counter";
var CounterStateTypeId = /* @__PURE__ */ Symbol.for(CounterStateSymbolKey);
var FrequencyStateSymbolKey = "effect/io/Metric/State/Frequency";
var FrequencyStateTypeId = /* @__PURE__ */ Symbol.for(FrequencyStateSymbolKey);
var GaugeStateSymbolKey = "effect/io/Metric/State/Gauge";
var GaugeStateTypeId = /* @__PURE__ */ Symbol.for(GaugeStateSymbolKey);
var HistogramStateSymbolKey = "effect/io/Metric/State/Histogram";
var HistogramStateTypeId = /* @__PURE__ */ Symbol.for(HistogramStateSymbolKey);
var SummaryStateSymbolKey = "effect/io/Metric/State/Summary";
var SummaryStateTypeId = /* @__PURE__ */ Symbol.for(SummaryStateSymbolKey);
var metricStateVariance = {
  _A: (_) => _
};
var CounterState = class {
  constructor(count) {
    this.count = count;
    this[_a17] = metricStateVariance;
    this[_b9] = CounterStateTypeId;
  }
  [(_a17 = MetricStateTypeId, _b9 = CounterStateTypeId, symbol)]() {
    return combine(hash(this.count))(hash(CounterStateSymbolKey));
  }
  [symbol2](that) {
    return isCounterState(that) && this.count === that.count;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var FrequencyState = class {
  constructor(occurrences) {
    this.occurrences = occurrences;
    this[_c6] = metricStateVariance;
    this[_d3] = FrequencyStateTypeId;
  }
  [(_c6 = MetricStateTypeId, _d3 = FrequencyStateTypeId, symbol)]() {
    return combine(hash(this.occurrences))(hash(FrequencyStateSymbolKey));
  }
  [symbol2](that) {
    return isFrequencyState(that) && equals(this.occurrences, that.occurrences);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var GaugeState = class {
  constructor(value2) {
    this.value = value2;
    this[_e2] = metricStateVariance;
    this[_f2] = GaugeStateTypeId;
  }
  [(_e2 = MetricStateTypeId, _f2 = GaugeStateTypeId, symbol)]() {
    return combine(hash(this.value))(hash(GaugeStateSymbolKey));
  }
  [symbol2](u) {
    return isGaugeState(u) && this.value === u.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var HistogramState = class {
  constructor(buckets, count, min3, max5, sum2) {
    this.buckets = buckets;
    this.count = count;
    this.min = min3;
    this.max = max5;
    this.sum = sum2;
    this[_g2] = metricStateVariance;
    this[_h2] = HistogramStateTypeId;
  }
  [(_g2 = MetricStateTypeId, _h2 = HistogramStateTypeId, symbol)]() {
    return combine(hash(this.sum))(combine(hash(this.max))(combine(hash(this.min))(combine(hash(this.count))(combine(hash(this.buckets))(hash(HistogramStateSymbolKey))))));
  }
  [symbol2](that) {
    return isHistogramState(that) && equals(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var SummaryState = class {
  constructor(error2, quantiles, count, min3, max5, sum2) {
    this.error = error2;
    this.quantiles = quantiles;
    this.count = count;
    this.min = min3;
    this.max = max5;
    this.sum = sum2;
    this[_j2] = metricStateVariance;
    this[_k2] = SummaryStateTypeId;
  }
  [(_j2 = MetricStateTypeId, _k2 = SummaryStateTypeId, symbol)]() {
    return combine(hash(this.sum))(combine(hash(this.max))(combine(hash(this.min))(combine(hash(this.count))(combine(hash(this.quantiles))(combine(hash(this.error))(hash(SummaryStateSymbolKey)))))));
  }
  [symbol2](that) {
    return isSummaryState(that) && this.error === that.error && equals(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var counter3 = (count) => {
  return new CounterState(count);
};
var frequency2 = (occurrences) => {
  return new FrequencyState(occurrences);
};
var gauge2 = (value2) => {
  return new GaugeState(value2);
};
var histogram3 = (options) => new HistogramState(options.buckets, options.count, options.min, options.max, options.sum);
var summary2 = (options) => new SummaryState(options.error, options.quantiles, options.count, options.min, options.max, options.sum);
var isCounterState = (u) => {
  return typeof u === "object" && u != null && CounterStateTypeId in u;
};
var isFrequencyState = (u) => {
  return typeof u === "object" && u != null && FrequencyStateTypeId in u;
};
var isGaugeState = (u) => {
  return typeof u === "object" && u != null && GaugeStateTypeId in u;
};
var isHistogramState = (u) => {
  return typeof u === "object" && u != null && HistogramStateTypeId in u;
};
var isSummaryState = (u) => {
  return typeof u === "object" && u != null && SummaryStateTypeId in u;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/hook.mjs
var MetricHookSymbolKey = "@effect/io/Metric/Hook";
var MetricHookTypeId = /* @__PURE__ */ Symbol.for(MetricHookSymbolKey);
var metricHookVariance = {
  _In: (_) => _,
  _Out: (_) => _
};
var make27 = (options) => ({
  [MetricHookTypeId]: metricHookVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
var counter4 = (_key) => {
  let sum2 = 0;
  return make27({
    get: () => counter3(sum2),
    update: (value2) => {
      sum2 = sum2 + value2;
    }
  });
};
var frequency3 = (_key) => {
  let count = 0;
  const values3 = /* @__PURE__ */ new Map();
  const update6 = (word) => {
    count = count + 1;
    const slotCount = values3.get(word) ?? 0;
    values3.set(word, slotCount + 1);
  };
  const snapshot = () => fromIterable4(values3.entries());
  return make27({
    get: () => frequency2(snapshot()),
    update: update6
  });
};
var gauge3 = (_key, startAt) => {
  let value2 = startAt;
  return make27({
    get: () => gauge2(value2),
    update: (v) => {
      value2 = v;
    }
  });
};
var histogram4 = (key2) => {
  const bounds = key2.keyType.boundaries.values;
  const size8 = bounds.length;
  const values3 = new Uint32Array(size8 + 1);
  const boundaries = new Float32Array(size8);
  let count = 0;
  let sum2 = 0;
  let min3 = Number.MAX_VALUE;
  let max5 = Number.MIN_VALUE;
  map5((n, i) => {
    boundaries[i] = n;
  })(sort2(Order)(bounds));
  const update6 = (value2) => {
    let from2 = 0;
    let to2 = size8;
    while (from2 !== to2) {
      const mid = Math.floor(from2 + (to2 - from2) / 2);
      const boundary = boundaries[mid];
      if (value2 <= boundary) {
        to2 = mid;
      } else {
        from2 = mid;
      }
      if (to2 === from2 + 1) {
        if (value2 <= boundaries[from2]) {
          to2 = from2;
        } else {
          from2 = to2;
        }
      }
    }
    values3[from2] = values3[from2] + 1;
    count = count + 1;
    sum2 = sum2 + value2;
    if (value2 < min3) {
      min3 = value2;
    }
    if (value2 > max5) {
      max5 = value2;
    }
  };
  const getBuckets = () => {
    const builder = Array(size8);
    let cumulated = 0;
    for (let i = 0; i < size8; i++) {
      const boundary = boundaries[i];
      const value2 = values3[i];
      cumulated = cumulated + value2;
      builder[i] = [boundary, cumulated];
    }
    return unsafeFromArray(builder);
  };
  return make27({
    get: () => histogram3({
      buckets: getBuckets(),
      count,
      min: min3,
      max: max5,
      sum: sum2
    }),
    update: update6
  });
};
var summary3 = (key2) => {
  const {
    error: error2,
    maxAge,
    maxSize,
    quantiles
  } = key2.keyType;
  const sortedQuantiles = sort2(Order)(quantiles);
  const values3 = Array(maxSize);
  let head6 = 0;
  let count = 0;
  let sum2 = 0;
  let min3 = Number.MAX_VALUE;
  let max5 = Number.MIN_VALUE;
  const snapshot = (now) => {
    const builder = [];
    let i = 0;
    while (i !== maxSize - 1) {
      const item = values3[i];
      if (item != null) {
        const [t, v] = item;
        const age = millis(now - t);
        if (greaterThanOrEqualTo2(age, zero) && age <= maxAge) {
          builder.push(v);
        }
      }
      i = i + 1;
    }
    return calculateQuantiles(error2, sortedQuantiles, sort2(Order)(unsafeFromArray(builder)));
  };
  const observe = (value2, timestamp) => {
    if (maxSize > 0) {
      head6 = head6 + 1;
      const target = head6 % maxSize;
      values3[target] = [timestamp, value2];
    }
    count = count + 1;
    sum2 = sum2 + value2;
    if (value2 < min3) {
      min3 = value2;
    }
    if (value2 > max5) {
      max5 = value2;
    }
  };
  return make27({
    get: () => summary2({
      error: error2,
      quantiles: snapshot(Date.now()),
      count,
      min: min3,
      max: max5,
      sum: sum2
    }),
    update: ([value2, timestamp]) => observe(value2, timestamp)
  });
};
var calculateQuantiles = (error2, sortedQuantiles, sortedSamples) => {
  const sampleCount = sortedSamples.length;
  if (isEmpty3(sortedQuantiles)) {
    return empty8();
  }
  const head6 = unsafeHead(sortedQuantiles);
  const tail = drop(1)(sortedQuantiles);
  const resolved = reduce(of2(resolveQuantile(error2, sampleCount, none2(), 0, head6, sortedSamples)), (accumulator, quantile) => {
    const h = unsafeHead(accumulator);
    return append2(resolveQuantile(error2, sampleCount, h.value, h.consumed, quantile, h.rest))(accumulator);
  })(tail);
  return map5((rq) => [rq.quantile, rq.value])(resolved);
};
var resolveQuantile = (error2, sampleCount, current, consumed, quantile, rest) => {
  let error_1 = error2;
  let sampleCount_1 = sampleCount;
  let current_1 = current;
  let consumed_1 = consumed;
  let quantile_1 = quantile;
  let rest_1 = rest;
  let error_2 = error2;
  let sampleCount_2 = sampleCount;
  let current_2 = current;
  let consumed_2 = consumed;
  let quantile_2 = quantile;
  let rest_2 = rest;
  while (1) {
    if (isEmpty3(rest_1)) {
      return {
        quantile: quantile_1,
        value: none2(),
        consumed: consumed_1,
        rest: empty8()
      };
    }
    if (quantile_1 === 1) {
      return {
        quantile: quantile_1,
        value: some2(unsafeLast(rest_1)),
        consumed: consumed_1 + rest_1.length,
        rest: empty8()
      };
    }
    const sameHead = splitWhere((n) => n > unsafeHead(rest_1))(rest_1);
    const desired = quantile_1 * sampleCount_1;
    const allowedError = error_1 / 2 * desired;
    const candConsumed = consumed_1 + sameHead[0].length;
    const candError = Math.abs(candConsumed - desired);
    if (candConsumed < desired - allowedError) {
      error_2 = error_1;
      sampleCount_2 = sampleCount_1;
      current_2 = head2(rest_1);
      consumed_2 = candConsumed;
      quantile_2 = quantile_1;
      rest_2 = sameHead[1];
      error_1 = error_2;
      sampleCount_1 = sampleCount_2;
      current_1 = current_2;
      consumed_1 = consumed_2;
      quantile_1 = quantile_2;
      rest_1 = rest_2;
      continue;
    }
    if (candConsumed > desired + allowedError) {
      return {
        quantile: quantile_1,
        value: current_1,
        consumed: consumed_1,
        rest: rest_1
      };
    }
    switch (current_1._tag) {
      case "None": {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head2(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead[1];
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      case "Some": {
        const prevError = Math.abs(desired - current_1.value);
        if (candError < prevError) {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head2(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead[1];
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        return {
          quantile: quantile_1,
          value: some2(current_1.value),
          consumed: consumed_1,
          rest: rest_1
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/io/issues");
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/pair.mjs
var MetricPairSymbolKey = "@effect/io/Metric/Pair";
var MetricPairTypeId = /* @__PURE__ */ Symbol.for(MetricPairSymbolKey);
var metricPairVariance = {
  _Type: (_) => _
};
var unsafeMake8 = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState,
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric/registry.mjs
var _a18;
var MetricRegistrySymbolKey = "@effect/io/Metric/Registry";
var MetricRegistryTypeId = /* @__PURE__ */ Symbol.for(MetricRegistrySymbolKey);
var MetricRegistryImpl = class {
  constructor() {
    this[_a18] = MetricRegistryTypeId;
    this.map = empty7();
  }
  snapshot() {
    const result = [];
    for (const [key2, hook] of this.map) {
      result.push(unsafeMake8(key2, hook.get()));
    }
    return fromIterable6(result);
  }
  get(key2) {
    const hook = getOrUndefined(get7(key2)(this.map));
    if (hook == null) {
      if (isCounterKey(key2.keyType)) {
        return this.getCounter(key2);
      }
      if (isGaugeKey(key2.keyType)) {
        return this.getGauge(key2);
      }
      if (isFrequencyKey(key2.keyType)) {
        return this.getFrequency(key2);
      }
      if (isHistogramKey(key2.keyType)) {
        return this.getHistogram(key2);
      }
      if (isSummaryKey(key2.keyType)) {
        return this.getSummary(key2);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/io/issues");
    } else {
      return hook;
    }
  }
  getCounter(key2) {
    let value2 = getOrUndefined(get7(key2)(this.map));
    if (value2 == null) {
      const counter6 = counter4(key2);
      if (!has3(key2)(this.map)) {
        set4(key2, counter6)(this.map);
      }
      value2 = counter6;
    }
    return value2;
  }
  getFrequency(key2) {
    let value2 = getOrUndefined(get7(key2)(this.map));
    if (value2 == null) {
      const frequency5 = frequency3(key2);
      if (!has3(key2)(this.map)) {
        set4(key2, frequency5)(this.map);
      }
      value2 = frequency5;
    }
    return value2;
  }
  getGauge(key2) {
    let value2 = getOrUndefined(get7(key2)(this.map));
    if (value2 == null) {
      const gauge5 = gauge3(key2, 0);
      if (!has3(key2)(this.map)) {
        set4(key2, gauge5)(this.map);
      }
      value2 = gauge5;
    }
    return value2;
  }
  getHistogram(key2) {
    let value2 = getOrUndefined(get7(key2)(this.map));
    if (value2 == null) {
      const histogram6 = histogram4(key2);
      if (!has3(key2)(this.map)) {
        set4(key2, histogram6)(this.map);
      }
      value2 = histogram6;
    }
    return value2;
  }
  getSummary(key2) {
    let value2 = getOrUndefined(get7(key2)(this.map));
    if (value2 == null) {
      const summary5 = summary3(key2);
      if (!has3(key2)(this.map)) {
        set4(key2, summary5)(this.map);
      }
      value2 = summary5;
    }
    return value2;
  }
};
_a18 = MetricRegistryTypeId;
var make28 = () => {
  return new MetricRegistryImpl();
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/metric.mjs
var MetricSymbolKey = "@effect/io/Metric";
var MetricTypeId = /* @__PURE__ */ Symbol.for(MetricSymbolKey);
var metricVariance = {
  _Type: (_) => _,
  _In: (_) => _,
  _Out: (_) => _
};
var globalMetricRegistry = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Metric/globalMetricRegistry"), () => make28());
var make29 = function(keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign((effect) => tap(effect, (a) => sync(() => unsafeUpdate(a, empty12()))), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue,
    pipe() {
      return pipeArguments(this, arguments);
    }
  });
  return metric;
};
var counter5 = (name, description2) => fromMetricKey(counter2(name, description2));
var fromMetricKey = (key2) => {
  const hook = (extraTags) => {
    const fullKey = taggedWithLabelSet(extraTags)(key2);
    return globalMetricRegistry.get(fullKey);
  };
  return make29(key2.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get());
};
var histogram5 = (name, boundaries, description2) => fromMetricKey(histogram2(name, boundaries, description2));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/request.mjs
var complete = /* @__PURE__ */ dual(2, (self, result) => fiberRefGetWith(currentRequestMap, (map14) => sync(() => {
  if (map14.has(self)) {
    const entry = map14.get(self);
    if (!entry.state.completed) {
      entry.state.completed = true;
      deferredUnsafeDone(entry.result, result);
    }
  }
})));
var Listeners = class {
  constructor() {
    this.count = 0;
    this.observers = /* @__PURE__ */ new Set();
  }
  addObserver(f) {
    this.observers.add(f);
  }
  removeObserver(f) {
    this.observers.delete(f);
  }
  increment() {
    this.count++;
    this.observers.forEach((f) => f(this.count));
  }
  decrement() {
    this.count--;
    this.observers.forEach((f) => f(this.count));
  }
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/supervisor.mjs
var _a19;
var _b10;
var _c7;
var _d4;
var _e3;
var SupervisorSymbolKey = "@effect/io/Supervisor";
var SupervisorTypeId = /* @__PURE__ */ Symbol.for(SupervisorSymbolKey);
var supervisorVariance = {
  _T: (_) => _
};
var ProxySupervisor = class _ProxySupervisor {
  constructor(underlying, value0) {
    this.underlying = underlying;
    this.value0 = value0;
    this[_a19] = supervisorVariance;
  }
  value() {
    return this.value0();
  }
  onStart(context4, effect, parent, fiber) {
    this.underlying.onStart(context4, effect, parent, fiber);
  }
  onEnd(value2, fiber) {
    this.underlying.onEnd(value2, fiber);
  }
  onEffect(fiber, effect) {
    this.underlying.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new _ProxySupervisor(this, () => map9(f)(this.value()));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, fiber) {
    return this.underlying.onRun(execution, fiber);
  }
};
_a19 = SupervisorTypeId;
var Zip = class _Zip {
  constructor(left3, right3) {
    this.left = left3;
    this.right = right3;
    this[_b10] = supervisorVariance;
  }
  value() {
    return zip3(this.left.value(), this.right.value());
  }
  onStart(context4, effect, parent, fiber) {
    this.left.onStart(context4, effect, parent, fiber);
    this.right.onStart(context4, effect, parent, fiber);
  }
  onEnd(value2, fiber) {
    this.left.onEnd(value2, fiber);
    this.right.onEnd(value2, fiber);
  }
  onEffect(fiber, effect) {
    this.left.onEffect(fiber, effect);
    this.right.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, () => map9(f)(this.value()));
  }
  zip(right3) {
    return new _Zip(this, right3);
  }
  onRun(execution, fiber) {
    return this.right.onRun(() => this.left.onRun(execution, fiber), fiber);
  }
};
_b10 = SupervisorTypeId;
var Track = class {
  constructor() {
    this[_c7] = supervisorVariance;
    this.fibers = /* @__PURE__ */ new Set();
  }
  value() {
    return sync(() => Array.from(this.fibers));
  }
  onStart(_context, _effect, _parent, fiber) {
    this.fibers.add(fiber);
  }
  onEnd(_value, fiber) {
    this.fibers.delete(fiber);
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, () => map9(f)(this.value()));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, _fiber) {
    return execution();
  }
};
_c7 = SupervisorTypeId;
var Const = class {
  constructor(effect) {
    this.effect = effect;
    this[_d4] = supervisorVariance;
  }
  value() {
    return this.effect;
  }
  onStart(_context, _effect, _parent, _fiber) {
  }
  onEnd(_value, _fiber) {
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, () => map9(f)(this.value()));
  }
  zip(right3) {
    return new Zip(this, right3);
  }
  onRun(execution, _fiber) {
    return execution();
  }
};
_d4 = SupervisorTypeId;
_e3 = SupervisorTypeId;
var unsafeTrack = () => {
  return new Track();
};
var track = /* @__PURE__ */ sync(unsafeTrack);
var fromEffect = (effect) => {
  return new Const(effect);
};
var none8 = /* @__PURE__ */ fromEffect(unit);

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/supervisor/patch.mjs
var OP_EMPTY3 = "Empty";
var OP_ADD_SUPERVISOR = "AddSupervisor";
var OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
var OP_AND_THEN2 = "AndThen";
var empty22 = {
  _tag: OP_EMPTY3
};
var combine10 = (self, that) => {
  return {
    _tag: OP_AND_THEN2,
    first: self,
    second: that
  };
};
var patch10 = (self, supervisor) => {
  return patchLoop(supervisor, of2(self));
};
var patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (isNonEmpty(patches)) {
    const head6 = headNonEmpty2(patches);
    switch (head6._tag) {
      case OP_EMPTY3: {
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_ADD_SUPERVISOR: {
        supervisor = supervisor.zip(head6.supervisor);
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_REMOVE_SUPERVISOR: {
        supervisor = removeSupervisor(supervisor, head6.supervisor);
        patches = tailNonEmpty2(patches);
        break;
      }
      case OP_AND_THEN2: {
        patches = prepend2(head6.first)(prepend2(head6.second)(tailNonEmpty2(patches)));
        break;
      }
    }
  }
  return supervisor;
};
var removeSupervisor = (self, that) => {
  if (equals(self, that)) {
    return none8;
  } else {
    if (self instanceof Zip) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
var toSet2 = (self) => {
  if (equals(self, none8)) {
    return empty12();
  } else {
    if (self instanceof Zip) {
      return union4(toSet2(self.right))(toSet2(self.left));
    } else {
      return make9(self);
    }
  }
};
var diff9 = (oldValue, newValue) => {
  if (equals(oldValue, newValue)) {
    return empty22;
  }
  const oldSupervisors = toSet2(oldValue);
  const newSupervisors = toSet2(newValue);
  const added = reduce5(empty22, (patch11, supervisor) => combine10(patch11, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  }))(difference2(oldSupervisors)(newSupervisors));
  const removed = reduce5(empty22, (patch11, supervisor) => combine10(patch11, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  }))(difference2(newSupervisors)(oldSupervisors));
  return combine10(added, removed);
};
var differ2 = /* @__PURE__ */ make11({
  empty: empty22,
  patch: patch10,
  combine: combine10,
  diff: diff9
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/fiberRuntime.mjs
var _a20;
var _b11;
var fiberStarted = /* @__PURE__ */ counter5("effect_fiber_started");
var fiberActive = /* @__PURE__ */ counter5("effect_fiber_active");
var fiberSuccesses = /* @__PURE__ */ counter5("effect_fiber_successes");
var fiberFailures = /* @__PURE__ */ counter5("effect_fiber_failures");
var fiberLifetimes = /* @__PURE__ */ histogram5("effect_fiber_lifetimes", /* @__PURE__ */ exponential({
  start: 1,
  factor: 2,
  count: 100
}));
var EvaluationSignalContinue = "Continue";
var EvaluationSignalDone = "Done";
var EvaluationSignalYieldNow = "Yield";
var runtimeFiberVariance = {
  _E: (_) => _,
  _A: (_) => _
};
var absurd = (_) => {
  throw new Error(`BUG: FiberRuntime - ${JSON.stringify(_)} - please report an issue at https://github.com/Effect-TS/io/issues`);
};
var contOpSuccess = {
  [OP_ON_SUCCESS]: (_, cont, value2) => {
    return cont.i1(value2);
  },
  ["OnStep"]: (_, cont, value2) => {
    return cont.i1(exitSucceed(value2));
  },
  [OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value2) => {
    return cont.i2(value2);
  },
  [OP_REVERT_FLAGS]: (self, cont, value2) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch);
    if (interruptible(self._runtimeFlags) && self.isInterrupted()) {
      return exitFailCause(self.getInterruptedCause());
    } else {
      return exitSucceed(value2);
    }
  },
  [OP_WHILE]: (self, cont, value2) => {
    cont.i2(value2);
    if (cont.i0()) {
      self.pushStack(cont);
      return cont.i1();
    } else {
      return unit;
    }
  }
};
var drainQueueWhileRunningTable = {
  [OP_INTERRUPT_SIGNAL]: (self, runtimeFlags3, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return interruptible(runtimeFlags3) ? exitFailCause(message.cause) : cur;
  },
  [OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [OP_STATEFUL]: (self, runtimeFlags3, cur, message) => {
    message.onFiber(self, running2(runtimeFlags3));
    return cur;
  },
  [OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return flatMap7(yieldNow(), () => cur);
  }
};
var runBlockedRequests = (self) => forEachSequentialDiscard(flatten4(self), (requestsByRequestResolver) => forEachParUnboundedDiscard(sequentialCollectionToChunk(requestsByRequestResolver), ([dataSource, sequential3]) => {
  const map14 = /* @__PURE__ */ new Map();
  for (const block of sequential3) {
    for (const entry of block) {
      map14.set(entry.request, entry);
    }
  }
  return fiberRefLocally(invokeWithInterrupt(dataSource.runAll(sequential3), sequential3.flat()), currentRequestMap, map14);
}, false));
var FiberRuntime = class {
  pipe() {
    return pipeArguments(this, arguments);
  }
  constructor(fiberId3, fiberRefs0, runtimeFlags0) {
    this[_a20] = fiberVariance;
    this[_b11] = runtimeFiberVariance;
    this._queue = new Array();
    this._children = null;
    this._observers = new Array();
    this._running = false;
    this._stack = [];
    this._asyncInterruptor = null;
    this._asyncBlockingOn = null;
    this._exitValue = null;
    this._steps = [false];
    this.run = () => {
      this.drainQueueOnCurrentThread();
    };
    this._runtimeFlags = runtimeFlags0;
    this._fiberId = fiberId3;
    this._fiberRefs = fiberRefs0;
    this._supervisor = this.getFiberRef(currentSupervisor);
    if (runtimeMetrics(runtimeFlags0)) {
      const tags2 = this.getFiberRef(currentMetricLabels);
      fiberStarted.unsafeUpdate(1, tags2);
      fiberActive.unsafeUpdate(1, tags2);
    }
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(effect) {
    this.tell(resume(effect));
  }
  /**
   * The status of the fiber.
   */
  status() {
    return this.ask((_, status) => status);
  }
  /**
   * Gets the fiber runtime flags.
   */
  runtimeFlags() {
    return this.ask((state, status) => {
      if (isDone2(status)) {
        return state._runtimeFlags;
      }
      return status.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return unsafeMake7(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  children() {
    return this.ask((fiber) => Array.from(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = /* @__PURE__ */ new Set();
    }
    return this._children;
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(currentInterruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((fiber) => fiber.unsafeGetFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return suspend(() => {
      const deferred = deferredUnsafeMake(this._fiberId);
      this.tell(stateful((fiber, status) => {
        deferredUnsafeDone(deferred, sync(() => f(fiber, status)));
      }));
      return deferredAwait(deferred);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    this._queue.push(message);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  await() {
    return async((resume2) => {
      const cb = (exit3) => resume2(succeed(exit3));
      this.tell(stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.unsafeAddObserver(cb);
        }
      }));
      return sync(() => this.tell(stateful((fiber, _) => {
        fiber.unsafeRemoveObserver(cb);
      })));
    }, this.id());
  }
  inheritAll() {
    return withFiberRuntime((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.unsafeGetFiberRefs();
      const updatedFiberRefs = joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch11 = exclude2(WindDown)(
        // Do not inherit WindDown or Interruption!
        exclude2(Interruption)(diff6(parentRuntimeFlags, updatedRuntimeFlags))
      );
      return updateRuntimeFlags(patch11);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  poll() {
    return sync(() => fromNullable(this._exitValue));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId3) {
    return sync(() => this.tell(interruptSignal(interrupt(fiberId3))));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeAddObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeRemoveObserver(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  unsafeGetFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    if (this._fiberRefs.locals.has(fiberRef)) {
      return this._fiberRefs.locals.get(fiberRef)[0][1];
    }
    return fiberRef.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value2) {
    this._fiberRefs = updatedAs(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef,
      value: value2
    });
    if (fiberRef === currentSupervisor) {
      this._supervisor = value2;
    }
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs2) {
    this._fiberRefs = fiberRefs2;
    this._supervisor = this.getFiberRef(currentSupervisor);
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = this._queue.length === 0 ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
        }
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
      }
      if (this._queue.length > 0 && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this.getFiberRef(currentScheduler).scheduleTask(this.run, this.getFiberRef(currentSchedulingPriority));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags3, cur0) {
    let cur = cur0;
    while (this._queue.length > 0) {
      const message = this._queue.splice(0, 1)[0];
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags3, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !isEmpty5(this.getFiberRef(currentInterruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause3) {
    const oldSC = this.getFiberRef(currentInterruptedCause);
    this.setFiberRef(currentInterruptedCause, sequential(oldSC, cause3));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause3) {
    this.addInterruptedCause(cause3);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(interruptSignal(interrupt(this.id())));
      told = true;
    }
    return told;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children.values();
      this._children = null;
      let isDone5 = false;
      const body = () => {
        const next = it.next();
        if (!next.done) {
          return asUnit(next.value.await());
        } else {
          return sync(() => {
            isDone5 = true;
          });
        }
      };
      return whileLoop({
        while: () => !isDone5,
        body,
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(exit3) {
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags2 = this.getFiberRef(currentMetricLabels);
      fiberActive.unsafeUpdate(-1, tags2);
      switch (exit3._tag) {
        case OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags2);
          break;
        }
        case OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags2);
          break;
        }
      }
    }
    if (exit3._tag === "Failure") {
      const level = this.getFiberRef(currentUnhandledErrorLogLevel);
      if (!isInterruptedOnly(exit3.cause) && level._tag === "Some") {
        this.log("Fiber terminated with a non handled error", exit3.cause, level);
      }
    }
  }
  setExitValue(exit3) {
    this._exitValue = exit3;
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags2 = this.getFiberRef(currentMetricLabels);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = (/* @__PURE__ */ new Date()).getTime();
      fiberLifetimes.unsafeUpdate((endTimeMillis - startTimeMillis) / 1e3, tags2);
    }
    this.reportExitValue(exit3);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit3);
    }
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause3, overrideLogLevel) {
    const logLevel3 = isSome2(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(currentLogLevel);
    const minimumLogLevel = this.getFiberRef(currentMinimumLogLevel);
    if (greaterThan2(minimumLogLevel, logLevel3)) {
      return;
    }
    const spans = this.getFiberRef(currentLogSpan);
    const annotations = this.getFiberRef(currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.unsafeGetFiberRefs();
    if (size5(loggers) > 0) {
      const clockService = get3(this.getFiberRef(currentServices), clockTag);
      const date4 = new Date(clockService.unsafeCurrentTimeMillis());
      for (const logger of loggers) {
        logger.log({
          fiberId: this.id(),
          logLevel: logLevel3,
          message,
          cause: cause3,
          context: contextMap,
          spans,
          annotations,
          date: date4
        });
      }
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case OP_YIELD_NOW: {
        return EvaluationSignalYieldNow;
      }
      case OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause);
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(exitFailCause(message.cause));
          this._asyncInterruptor = null;
        }
        return EvaluationSignalContinue;
      }
      case OP_RESUME: {
        this._asyncInterruptor = null;
        this._asyncBlockingOn = null;
        this.evaluateEffect(message.effect);
        return EvaluationSignalContinue;
      }
      case OP_STATEFUL: {
        message.onFiber(this, this._exitValue !== null ? done4 : suspended2(this._runtimeFlags, this._asyncBlockingOn));
        return EvaluationSignalContinue;
      }
      default: {
        return absurd(message);
      }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this._supervisor.onResume(this);
    try {
      let effect = interruptible(this._runtimeFlags) && this.isInterrupted() ? exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect !== null) {
        try {
          const eff = effect;
          const exit3 = this.runLoop(eff);
          this._runtimeFlags = enable2(WindDown)(this._runtimeFlags);
          const interruption2 = this.interruptAllChildren();
          if (interruption2 !== null) {
            effect = flatMap7(interruption2, () => exit3);
          } else {
            if (this._queue.length === 0) {
              this.setExitValue(exit3);
            } else {
              this.tell(resume(exit3));
            }
            effect = null;
          }
        } catch (e) {
          if (isEffect(e)) {
            if (e._tag === OP_YIELD) {
              if (cooperativeYielding(this._runtimeFlags)) {
                this.tell(yieldNow2());
                this.tell(resume(exitUnit));
                effect = null;
              } else {
                effect = exitUnit;
              }
            } else if (e._tag === OP_ASYNC) {
              effect = null;
            }
          } else {
            throw e;
          }
        }
      }
    } finally {
      this._supervisor.onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(effect) {
    if (!this._running) {
      this._running = true;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        this.evaluateEffect(effect);
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
        if (this._queue.length > 0) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(resume(effect));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect) {
    this.tell(resume(effect));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch11) {
    const newRuntimeFlags = patch6(oldRuntimeFlags, patch11);
    globalThis[currentFiberURI] = this;
    this._runtimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags3, asyncRegister) {
    let alreadyCalled = false;
    const callback = (effect) => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(resume(effect));
      }
    };
    if (interruptible(runtimeFlags3)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(failCause(die(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if (cont._tag === "OnStep") {
      this._steps.push(true);
    }
    if (cont._tag === "RevertFlags") {
      this._steps.push(false);
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if (item._tag === "OnStep" || item._tag === "RevertFlags") {
        this._steps.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OP_ON_FAILURE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OP_ON_SUCCESS && frame._tag !== OP_WHILE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [(_a20 = FiberTypeId, _b11 = RuntimeFiberTypeId, OP_TAG)](op) {
    return map9(fiberRefGet(currentContext), (context4) => {
      try {
        return unsafeGet3(context4, op);
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  }
  ["Left"](op) {
    return exitFail(op.i0);
  }
  ["None"](_) {
    return exitFail(NoSuchElementException());
  }
  ["Right"](op) {
    return exitSucceed(op.i0);
  }
  ["Some"](op) {
    return exitSucceed(op.i0);
  }
  [OP_SYNC](op) {
    const value2 = op.i0();
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._tag in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._tag](this, cont, value2);
    } else {
      throw exitSucceed(value2);
    }
  }
  [OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._tag in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._tag](this, cont, oldCur.i0);
    } else {
      throw oldCur;
    }
  }
  [OP_FAILURE](op) {
    const span = this.getFiberRef(currentTracerSpan);
    const cause3 = isNil(span) || span.head._tag === "ExternalSpan" ? op.i0 : annotated(op.i0, makeSpanAnnotation(span.head));
    const cont = this.getNextFailCont();
    if (cont !== void 0) {
      switch (cont._tag) {
        case OP_ON_FAILURE:
        case OP_ON_SUCCESS_AND_FAILURE: {
          if (!(interruptible(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(cause3);
          } else {
            return exitFailCause(stripFailures(cause3));
          }
        }
        case "OnStep": {
          if (!(interruptible(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(exitFailCause(cause3));
          } else {
            return exitFailCause(stripFailures(cause3));
          }
        }
        case OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this._runtimeFlags, cont.patch);
          if (interruptible(this._runtimeFlags) && this.isInterrupted()) {
            return exitFailCause(sequential(cause3, this.getInterruptedCause()));
          } else {
            return exitFailCause(cause3);
          }
        }
        default: {
          absurd(cont);
        }
      }
    } else {
      throw exitFailCause(cause3);
    }
  }
  [OP_WITH_RUNTIME](op) {
    return op.i0(this, running2(this._runtimeFlags));
  }
  ["Blocked"](op) {
    if (this._steps[this._steps.length - 1]) {
      const nextOp = this.popStack();
      if (nextOp) {
        switch (nextOp._tag) {
          case "OnStep": {
            return nextOp.i1(op);
          }
          case "OnSuccess": {
            return blocked(op.i0, flatMap7(op.i1, nextOp.i1));
          }
          case "OnSuccessAndFailure": {
            return blocked(op.i0, matchCauseEffect(op.i1, {
              onFailure: nextOp.i1,
              onSuccess: nextOp.i2
            }));
          }
          case "OnFailure": {
            return blocked(op.i0, catchAllCause(op.i1, nextOp.i1));
          }
          case "While": {
            return blocked(op.i0, flatMap7(op.i1, (a) => {
              nextOp.i2(a);
              if (nextOp.i0()) {
                return whileLoop({
                  while: nextOp.i0,
                  body: nextOp.i1,
                  step: nextOp.i2
                });
              }
              return unit;
            }));
          }
          case "RevertFlags": {
            this.pushStack(nextOp);
            break;
          }
        }
      }
    }
    return uninterruptibleMask((restore) => flatMap7(fork(runRequestBlock(op.i0)), () => restore(op.i1)));
  }
  ["RunBlocked"](op) {
    return runBlockedRequests(op.i0);
  }
  [OP_UPDATE_RUNTIME_FLAGS](op) {
    const updateFlags = op.i0;
    const oldRuntimeFlags = this._runtimeFlags;
    const newRuntimeFlags = patch6(oldRuntimeFlags, updateFlags);
    if (interruptible(newRuntimeFlags) && this.isInterrupted()) {
      return exitFailCause(this.getInterruptedCause());
    } else {
      this.patchRuntimeFlags(this._runtimeFlags, updateFlags);
      if (op.i1) {
        const revertFlags = diff6(newRuntimeFlags, oldRuntimeFlags);
        this.pushStack(new RevertFlags(revertFlags, op));
        return op.i1(oldRuntimeFlags);
      } else {
        return exitUnit;
      }
    }
  }
  [OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.i0;
  }
  ["OnStep"](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ASYNC](op) {
    this._asyncBlockingOn = op.i1;
    this.initiateAsync(this._runtimeFlags, op.i0);
    throw op;
  }
  [OP_YIELD](op) {
    throw op;
  }
  [OP_WHILE](op) {
    const check = op.i0;
    const body = op.i1;
    if (check()) {
      this.pushStack(op);
      return body();
    } else {
      return exitUnit;
    }
  }
  [OP_COMMIT](op) {
    return op.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    let ops = 0;
    while (true) {
      if ((this._runtimeFlags & OpSupervision) !== 0) {
        this._supervisor.onEffect(this, cur);
      }
      if (this._queue.length > 0) {
        cur = this.drainQueueWhileRunning(this._runtimeFlags, cur);
      }
      ops += 1;
      if (ops >= this.getFiberRef(currentMaxFiberOps)) {
        ops = 0;
        const oldCur = cur;
        cur = flatMap7(yieldNow(), () => oldCur);
      }
      try {
        if (!(cur._tag in this)) {
          if (typeof cur === "function") {
            console.log(cur());
          }
          absurd(cur);
        }
        cur = this._supervisor.onRun(
          // @ts-expect-error
          () => this[cur._tag](cur),
          this
        );
      } catch (e) {
        if (isEffect(e)) {
          if (e._tag === OP_YIELD || e._tag === OP_ASYNC) {
            throw e;
          }
          if (e._tag === OP_SUCCESS || e._tag === OP_FAILURE) {
            return e;
          }
        } else {
          if (isEffectError(e)) {
            cur = exitFailCause(e.cause);
          } else if (isInterruptedException(e)) {
            cur = exitFailCause(sequential(die(e), interrupt(none4)));
          } else {
            cur = exitFailCause(die(e));
          }
        }
      }
    }
  }
};
var currentMinimumLogLevel = /* @__PURE__ */ fiberRefUnsafeMake(/* @__PURE__ */ fromLiteral("Info"));
var defaultLogger = /* @__PURE__ */ makeLogger((options) => {
  const formatted = stringLogger.log(options);
  globalThis.console.log(formatted);
});
var tracerLogger = /* @__PURE__ */ makeLogger(({
  annotations,
  cause: cause3,
  context: context4,
  fiberId: fiberId3,
  logLevel: logLevel3,
  message
}) => {
  const span = flatMap(get9(context4, currentTracerSpan), head3);
  const clockService = map(get9(context4, currentServices), (_) => get3(_, clockTag));
  if (span._tag === "None" || span.value._tag === "ExternalSpan" || clockService._tag === "None") {
    return;
  }
  const attributes = Object.fromEntries(annotations);
  attributes["effect.fiberId"] = threadName2(fiberId3);
  attributes["effect.logLevel"] = logLevel3.label;
  if (cause3 !== null && cause3 !== empty16) {
    attributes["effect.cause"] = pretty(cause3);
  }
  span.value.event(String(message), clockService.value.unsafeCurrentTimeNanos(), attributes);
});
var currentLoggers = /* @__PURE__ */ fiberRefUnsafeMakeHashSet(/* @__PURE__ */ make9(defaultLogger, tracerLogger));
var acquireRelease = /* @__PURE__ */ dual((args) => isEffect(args[0]), (acquire, release) => {
  return uninterruptible(tap(acquire, (a) => addFinalizer((exit3) => release(a, exit3))));
});
var acquireReleaseInterruptible = /* @__PURE__ */ dual((args) => isEffect(args[0]), (acquire, release) => {
  return ensuring(acquire, addFinalizer((exit3) => release(exit3)));
});
var addFinalizer = (finalizer) => withFiberRuntime((runtime4) => {
  const acquireRefs = runtime4.unsafeGetFiberRefs();
  return flatMap7(scope, (scope3) => scopeAddFinalizerExit(scope3, (exit3) => withFiberRuntime((runtimeFinalizer) => {
    const pre = runtimeFinalizer.unsafeGetFiberRefs();
    const patch11 = diff8(pre, acquireRefs);
    const inverse2 = diff8(acquireRefs, pre);
    runtimeFinalizer.setFiberRefs(patch9(patch11, runtimeFinalizer.id(), acquireRefs));
    return ensuring(finalizer(exit3), sync(() => {
      runtimeFinalizer.setFiberRefs(patch9(inverse2, runtimeFinalizer.id(), runtimeFinalizer.unsafeGetFiberRefs()));
    }));
  })));
});
var daemonChildren = (self) => {
  const forkScope = fiberRefLocally(currentForkScopeOverride, some2(globalScope));
  return forkScope(self);
};
var _existsParFound = /* @__PURE__ */ Symbol("@effect/io/Effect/existsPar/found");
var exists = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options) => matchSimple(options, () => suspend(() => existsLoop(elements[Symbol.iterator](), 0, f)), () => matchEffect(forEachOptions(elements, (a, i) => if_(f(a, i), {
  onTrue: fail2(_existsParFound),
  onFalse: unit
}), options), {
  onFailure: (e) => e === _existsParFound ? succeed(true) : fail2(e),
  onSuccess: () => succeed(false)
})));
var existsLoop = (iterator, index2, f) => {
  const next = iterator.next();
  if (next.done) {
    return succeed(false);
  }
  return flatMap7(f(next.value, index2), (b) => b ? succeed(b) : existsLoop(iterator, index2 + 1, f));
};
var filter4 = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options) => {
  const predicate = options?.negate ? (a, i) => map9(f(a, i), not) : f;
  return matchSimple(options, () => suspend(() => fromIterable(elements).reduceRight((effect, a, i) => zipWith2(effect, suspend(() => predicate(a, i)), (list, b) => b ? [a, ...list] : list), sync(() => new Array()))), () => map9(forEachOptions(elements, (a, i) => map9(predicate(a, i), (b) => b ? some2(a) : none2()), options), compact));
});
var allResolveInput = (input) => {
  if (Array.isArray(input) || isIterable(input)) {
    return [input, none2()];
  }
  const keys3 = Object.keys(input);
  const size8 = keys3.length;
  return [keys3.map((k) => input[k]), some2((values3) => {
    const res = {};
    for (let i = 0; i < size8; i++) {
      ;
      res[keys3[i]] = values3[i];
    }
    return res;
  })];
};
var allValidate = (effects, reconcile, options) => {
  const eitherEffects = [];
  for (const effect of effects) {
    eitherEffects.push(either2(effect));
  }
  return flatMap7(forEachOptions(eitherEffects, identity, {
    concurrency: options?.concurrency,
    batching: options?.batching
  }), (eithers) => {
    const none10 = none2();
    const size8 = eithers.length;
    const errors = new Array(size8);
    const successes = new Array(size8);
    let errored = false;
    for (let i = 0; i < size8; i++) {
      const either5 = eithers[i];
      if (either5._tag === "Left") {
        errors[i] = some2(either5.left);
        errored = true;
      } else {
        successes[i] = either5.right;
        errors[i] = none10;
      }
    }
    if (errored) {
      return reconcile._tag === "Some" ? fail2(reconcile.value(errors)) : fail2(errors);
    } else if (options?.discard) {
      return unit;
    }
    return reconcile._tag === "Some" ? succeed(reconcile.value(successes)) : succeed(successes);
  });
};
var allEither = (effects, reconcile, options) => {
  const eitherEffects = [];
  for (const effect of effects) {
    eitherEffects.push(either2(effect));
  }
  if (options?.discard) {
    return forEachOptions(eitherEffects, identity, {
      concurrency: options?.concurrency,
      batching: options?.batching,
      discard: true
    });
  }
  return map9(forEachOptions(eitherEffects, identity, {
    concurrency: options?.concurrency,
    batching: options?.batching
  }), (eithers) => reconcile._tag === "Some" ? reconcile.value(eithers) : eithers);
};
var all4 = (arg, options) => {
  const [effects, reconcile] = allResolveInput(arg);
  if (options?.mode === "validate") {
    return allValidate(effects, reconcile, options);
  } else if (options?.mode === "either") {
    return allEither(effects, reconcile, options);
  }
  return reconcile._tag === "Some" ? map9(forEachOptions(effects, identity, options), reconcile.value) : forEachOptions(effects, identity, options);
};
var allWith = (options) => (arg) => all4(arg, options);
var allSuccesses = (elements, options) => map9(all4(fromIterable(elements).map(exit), options), filterMap((exit3) => exitIsSuccess(exit3) ? some2(exit3.i0) : none2()));
var replicate = /* @__PURE__ */ dual(2, (self, n) => Array.from({
  length: n
}, () => self));
var replicateEffect = /* @__PURE__ */ dual((args) => isEffect(args[0]), (self, n, options) => all4(replicate(n)(self), options));
var forEachOptions = /* @__PURE__ */ dual((args) => isIterable(args[0]), (self, f, options) => withFiberRuntime((r) => {
  const requestBatchingEnabled = options?.batching === true || options?.batching === "inherit" && r.getFiberRef(currentRequestBatching);
  if (options?.discard) {
    return match5(options, () => requestBatchingEnabled ? forEachBatchedDiscard(self, f) : forEachSequentialDiscard(self, f), () => forEachParUnboundedDiscard(self, f, requestBatchingEnabled), (n) => forEachParNDiscard(self, n, f, requestBatchingEnabled));
  }
  return match5(options, () => requestBatchingEnabled ? forEachParN(self, 1, f, true) : forEachSequential(self, f), () => forEachParUnbounded(self, f, requestBatchingEnabled), (n) => forEachParN(self, n, f, requestBatchingEnabled));
}));
var forEachParUnbounded = (self, f, batching) => suspend(() => {
  const as4 = fromIterable(self);
  const array7 = new Array(as4.length);
  const fn = (a, i) => flatMap7(f(a, i), (b) => sync(() => array7[i] = b));
  return zipRight(forEachParUnboundedDiscard(as4, fn, batching), succeed(array7));
});
var forEachBatchedDiscard = (self, f) => suspend(() => {
  const as4 = fromIterable(self);
  const size8 = as4.length;
  if (size8 === 0) {
    return unit;
  } else if (size8 === 1) {
    return asUnit(f(as4[0], 0));
  }
  const effects = as4.map(f);
  const blocked3 = new Array();
  const loop3 = (i) => i === effects.length ? suspend(() => {
    if (blocked3.length > 0) {
      const requests = blocked3.map((b) => b.i0).reduce(par);
      return blocked(requests, forEachBatchedDiscard(blocked3.map((b) => b.i1), identity));
    }
    return unit;
  }) : flatMapStep(effects[i], (s) => {
    if (s._tag === "Blocked") {
      blocked3.push(s);
      return loop3(i + 1);
    } else if (s._tag === "Failure") {
      return suspend(() => {
        if (blocked3.length > 0) {
          const requests = blocked3.map((b) => b.i0).reduce(par);
          return blocked(requests, flatMap7(forEachBatchedDiscard(blocked3.map((b) => b.i1), identity), () => s));
        }
        return unit;
      });
    } else {
      return loop3(i + 1);
    }
  });
  return loop3(0);
});
var forEachParUnboundedDiscard = (self, f, batching) => suspend(() => {
  const as4 = fromIterable(self);
  const size8 = as4.length;
  if (size8 === 0) {
    return unit;
  } else if (size8 === 1) {
    return asUnit(f(as4[0], 0));
  }
  return uninterruptibleMask((restore) => {
    const deferred = deferredUnsafeMake(none4);
    let ref = 0;
    const residual = [];
    const joinOrder = [];
    const process2 = transplant((graft) => forEachSequential(as4, (a, i) => map9((fiber) => {
      fiber.unsafeAddObserver(() => {
        joinOrder.push(fiber);
      });
      return fiber;
    })(forkDaemon(graft(flatMap7((exit3) => {
      switch (exit3._tag) {
        case "Failure": {
          if (residual.length > 0) {
            const requests = residual.map((blocked3) => blocked3.i0).reduce(par);
            const _continue3 = forEachParUnboundedDiscard(residual, (blocked3) => blocked3.i1, batching);
            return blocked(requests, matchCauseEffect(_continue3, {
              onFailure: (cause3) => zipRight(deferredFail(deferred, void 0), failCause(parallel(cause3, exit3.cause))),
              onSuccess: () => zipRight(deferredFail(deferred, void 0), failCause(exit3.cause))
            }));
          }
          return zipRight(deferredFail(deferred, void 0), failCause(exit3.cause));
        }
        default: {
          if (exit3._tag === "Blocked") {
            residual.push(exit3);
          }
          if (ref + 1 === size8) {
            if (residual.length > 0) {
              const requests = residual.map((blocked3) => blocked3.i0).reduce(par);
              const _continue3 = forEachParUnboundedDiscard(residual, (blocked3) => blocked3.i1, batching);
              return deferredSucceed(deferred, blocked(requests, _continue3));
            } else {
              deferredUnsafeDone(deferred, exitSucceed(exitUnit));
            }
          } else {
            ref = ref + 1;
          }
          return unit;
        }
      }
    })(suspend(() => restore((batching ? step2 : exit)(f(a, i))))))))));
    return flatMap7(process2, (fibers) => matchCauseEffect(restore(deferredAwait(deferred)), {
      onFailure: (cause3) => flatMap7(forEachParUnbounded(fibers, interruptFiber, batching), (exits) => {
        const exit3 = exitCollectAll(exits, {
          parallel: true
        });
        if (exit3._tag === "Some" && exitIsFailure(exit3.value)) {
          return failCause(parallel(stripFailures(cause3), exit3.value.i0));
        } else {
          return failCause(stripFailures(cause3));
        }
      }),
      onSuccess: (rest) => flatMap7(rest, () => forEachSequentialDiscard(joinOrder, (f2) => f2.inheritAll()))
    }));
  });
});
var forEachParN = (self, n, f, batching) => suspend(() => {
  const as4 = fromIterable(self);
  const array7 = new Array(as4.length);
  const fn = (a, i) => map9(f(a, i), (b) => array7[i] = b);
  return zipRight(forEachParNDiscard(as4, n, fn, batching), succeed(array7));
});
var forEachParNDiscard = (self, n, f, batching) => suspend(() => {
  let i = 0;
  const iterator = self[Symbol.iterator]();
  const residual = [];
  const worker = flatMap7(sync(() => iterator.next()), (next) => next.done ? unit : flatMap7((batching ? step2 : exit)(asUnit(f(next.value, i++))), (res) => {
    switch (res._tag) {
      case "Blocked": {
        residual.push(res);
        return worker;
      }
      case "Failure": {
        return res;
      }
      case "Success":
        return worker;
    }
  }));
  const effects = [];
  for (let i2 = 0; i2 < n; i2++) {
    effects.push(worker);
  }
  return flatMap7(exit(forEachParUnboundedDiscard(effects, identity, batching)), (exit3) => {
    if (residual.length === 0) {
      return exit3;
    }
    const requests = residual.map((blocked3) => blocked3.i0).reduce(par);
    const _continue3 = forEachParNDiscard(residual, n, (blocked3) => blocked3.i1, batching);
    if (exit3._tag === "Failure") {
      return blocked(requests, matchCauseEffect(_continue3, {
        onFailure: (cause3) => exitFailCause(parallel(exit3.cause, cause3)),
        onSuccess: () => exit3
      }));
    }
    return blocked(requests, _continue3);
  });
});
var fork = (self) => withFiberRuntime((state, status) => succeed(unsafeFork(self, state, status.runtimeFlags)));
var forkDaemon = (self) => forkWithScopeOverride(self, globalScope);
var forkWithErrorHandler = /* @__PURE__ */ dual(2, (self, handler) => fork(onError(self, (cause3) => {
  const either5 = failureOrCause(cause3);
  switch (either5._tag) {
    case "Left": {
      return handler(either5.left);
    }
    case "Right": {
      return failCause(either5.right);
    }
  }
})));
var unsafeFork = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect);
  return childFiber;
};
var unsafeMakeChildFiber = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = unsafeMake2();
  const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
  const childFiberRefs = forkAs(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = getOrDefault(childFiberRefs, currentContext);
  const supervisor = childFiber._supervisor;
  supervisor.onStart(childContext, effect, some2(parentFiber), childFiber);
  childFiber.unsafeAddObserver((exit3) => supervisor.onEnd(exit3, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : getOrElse(() => parentFiber.scope())(parentFiber.getFiberRef(currentForkScopeOverride));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
var forkWithScopeOverride = (self, scopeOverride) => withFiberRuntime((parentFiber, parentStatus) => succeed(unsafeFork(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
var mergeAll = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, zero2, f, options) => matchSimple(options, () => fromIterable(elements).reduce((acc, a, i) => zipWith2(acc, a, (acc2, a2) => f(acc2, a2, i)), succeed(zero2)), () => flatMap7(make26(zero2), (acc) => flatMap7(forEachOptions(elements, (effect, i) => flatMap7(effect, (a) => update5(acc, (b) => f(b, a, i))), options), () => get11(acc)))));
var partition3 = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options) => map9((chunk4) => partitionMap2(chunk4, identity))(forEachOptions(elements, (a, i) => either2(f(a, i)), options)));
var validateAll = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options) => flatMap7(partition3(elements, f, {
  concurrency: options?.concurrency,
  batching: options?.batching
}), ([es, bs]) => es.length === 0 ? options?.discard ? unit : succeed(bs) : fail2(es)));
var raceAll = (all7) => {
  const list = fromIterable5(all7);
  if (!isNonEmpty(list)) {
    return dieSync(() => IllegalArgumentException(`Received an empty collection of effects`));
  }
  const self = headNonEmpty2(list);
  const effects = tailNonEmpty2(list);
  const inheritAll2 = (res) => as2(res[0])(inheritAll(res[1]));
  return flatMap7((done7) => flatMap7((fails) => uninterruptibleMask((restore) => flatMap7((head6) => flatMap7((fibers) => onInterrupt(() => reduce(unit, (effect, fiber) => zipLeft(interruptFiber(fiber))(effect))(fibers))(restore(flatMap7(inheritAll2)(_await(done7)))))(tap((fibers) => reduce(unit, (effect, fiber) => zipRight(asUnit(fork(flatMap7(raceAllArbiter(fibers, fiber, done7, fails))(_await2(fiber)))))(effect))(fibers))(map9((tail) => prepend2(head6)(tail))(map9(unsafeFromArray)(forEachSequential((effect) => fork(interruptible2(effect)))(effects))))))(fork(interruptible2(self)))))(make26(effects.length)))(deferredMake());
};
var raceAllArbiter = (fibers, winner, deferred, fails) => (exit3) => exitMatchEffect(exit3, {
  onFailure: (cause3) => flatten5(modify4(fails, (fails2) => [fails2 === 0 ? asUnit(deferredFailCause(deferred, cause3)) : unit, fails2 - 1])),
  onSuccess: (value2) => flatMap7((set6) => set6 ? reduce(unit, (effect, fiber) => fiber === winner ? effect : zipLeft(interruptFiber(fiber))(effect))(fromIterable5(fibers)) : unit)(deferredSucceed(deferred, [value2, winner]))
});
var reduceEffect = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, zero2, f, options) => matchSimple(options, () => fromIterable(elements).reduce((acc, a, i) => zipWith2(acc, a, (acc2, a2) => f(acc2, a2, i)), zero2), () => suspend(() => map9((option6) => {
  switch (option6._tag) {
    case "None": {
      throw new Error("BUG: Effect.reduceEffect - please report an issue at https://github.com/Effect-TS/io/issues");
    }
    case "Some": {
      return option6.value;
    }
  }
})(mergeAll([zero2, ...elements], none2(), (acc, elem, i) => {
  switch (acc._tag) {
    case "None": {
      return some2(elem);
    }
    case "Some": {
      return some2(f(acc.value, elem, i));
    }
  }
}, options)))));
var parallelFinalizers = (self) => flatMap7(scope, (outerScope) => flatMap7(scopeMake(parallel2), (innerScope) => zipRight(scopeExtend(self, innerScope))(outerScope.addFinalizer((exit3) => innerScope.close(exit3)))));
var scopeWith = (f) => flatMap7(scopeTag, f);
var scopedEffect = (effect) => flatMap7(scopeMake(), (scope3) => scopeUse(scope3)(effect));
var sequentialFinalizers = (self) => scopeWith((scope3) => flatMap7((scope4) => scopeExtend(scope4)(self))(scopeFork(scope3, sequential2)));
var tagMetricsScoped = (key2, value2) => labelMetricsScoped([make22(key2, value2)]);
var labelMetricsScoped = (labels) => labelMetricsScopedSet(fromIterable6(labels));
var labelMetricsScopedSet = (labels) => fiberRefLocallyScopedWith(currentMetricLabels, (set6) => union4(labels)(set6));
var using = /* @__PURE__ */ dual(2, (self, use) => acquireUseRelease(scopeMake(), (scope3) => flatMap7(scopeExtend(self, scope3), use), (scope3, exit3) => scopeClose(scope3, exit3)));
var unsome = (self) => matchEffect(self, {
  onFailure: (option6) => {
    switch (option6._tag) {
      case "None": {
        return succeed(none2());
      }
      case "Some": {
        return fail2(option6.value);
      }
    }
  },
  onSuccess: (a) => succeed(some2(a))
});
var validate2 = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options) => validateWith(self, that, (a, b) => [a, b], options));
var validateWith = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, f, options) => flatten5(zipWithOptions(exit(self), exit(that), (ea, eb) => exitZipWith(ea, eb, {
  onSuccess: f,
  onFailure: (ca, cb) => options?.concurrent ? parallel(ca, cb) : sequential(ca, cb)
}), options)));
var validateFirst = /* @__PURE__ */ dual((args) => isIterable(args[0]), (elements, f, options) => flip(forEachOptions(elements, (a, i) => flip(f(a, i)), options)));
var withClockScoped = (value2) => fiberRefLocallyScopedWith(currentServices, add2(clockTag, value2));
var withConfigProviderScoped = (value2) => fiberRefLocallyScopedWith(currentServices, add2(configProviderTag, value2));
var withEarlyRelease = (self) => scopeWith((parent) => flatMap7(scopeFork(parent, sequential2), (child) => map9((value2) => [fiberIdWith((fiberId3) => scopeClose(child, exitInterrupt(fiberId3))), value2])(scopeExtend(child)(self))));
var zipOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options) => zipWithOptions(self, that, (a, b) => [a, b], options));
var zipLeftOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options) => zipWithOptions(self, that, (a, _) => a, options));
var zipRightOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, options) => zipWithOptions(self, that, (_, b) => b, options));
var zipWithOptions = /* @__PURE__ */ dual((args) => isEffect(args[1]), (self, that, f, options) => map9(all4([self, that], {
  concurrency: options?.concurrent ? 2 : 1,
  batching: options?.batching
}), ([a, a2]) => f(a, a2)));
var withRuntimeFlagsScoped = (update6) => {
  if (update6 === empty18) {
    return unit;
  }
  return uninterruptible(flatMap7((runtimeFlags3) => {
    const updatedRuntimeFlags = patch6(runtimeFlags3, update6);
    const revertRuntimeFlags = diff6(updatedRuntimeFlags, runtimeFlags3);
    return asUnit(zipRight(addFinalizer(() => updateRuntimeFlags(revertRuntimeFlags)))(updateRuntimeFlags(update6)));
  })(runtimeFlags));
};
var releaseMapReleaseAll = (strategy, exit3) => (self) => suspend(() => {
  switch (self.state._tag) {
    case "Exited": {
      return unit;
    }
    case "Running": {
      const finalizersMap = self.state.finalizers;
      const update6 = self.state.update;
      const finalizers = Array.from(finalizersMap.keys()).sort((a, b) => b - a).map((key2) => finalizersMap.get(key2));
      self.state = {
        _tag: "Exited",
        nextKey: self.state.nextKey,
        exit: exit3,
        update: update6
      };
      return isSequential(strategy) ? flatMap7((results) => getOrElse(() => exitUnit)(map(exitAsUnit)(exitCollectAll(results))))(forEachSequential((fin) => exit(update6(fin)(exit3)))(finalizers)) : isParallel(strategy) ? flatMap7((results) => getOrElse(() => exitUnit)(map(exitAsUnit)(exitCollectAll(results, {
        parallel: true
      }))))(forEachParUnbounded(finalizers, (fin) => exit(update6(fin)(exit3)), false)) : flatMap7((results) => getOrElse(() => exitUnit)(map(exitAsUnit)(exitCollectAll(results, {
        parallel: true
      }))))(forEachParN(finalizers, strategy.parallelism, (fin) => exit(update6(fin)(exit3)), false));
    }
  }
});
var scopeTag = /* @__PURE__ */ Tag(ScopeTypeId);
var scope = scopeTag;
var scopeMake = (strategy = sequential2) => map9(releaseMapMake, (rm) => ({
  [ScopeTypeId]: ScopeTypeId,
  [CloseableScopeTypeId]: CloseableScopeTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  fork: (strategy2) => uninterruptible(flatMap7((scope3) => as2(scope3)(tap((fin) => scopeAddFinalizerExit(scope3, fin))(releaseMapAdd(rm, (exit3) => scopeClose(scope3, exit3)))))(scopeMake(strategy2))),
  close: (exit3) => asUnit(releaseMapReleaseAll(strategy, exit3)(rm)),
  addFinalizer: (fin) => asUnit(releaseMapAdd(fin)(rm))
}));
var scopeExtend = /* @__PURE__ */ dual(2, (effect, scope3) => mapInputContext(
  effect,
  // @ts-expect-error
  merge3(make4(scopeTag, scope3))
));
var scopeUse = /* @__PURE__ */ dual(2, (effect, scope3) => onExit((exit3) => scope3.close(exit3))(scopeExtend(scope3)(effect)));
var fiberRefUnsafeMakeSupervisor = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: differ2,
  fork: empty22
});
var fiberRefLocallyScoped = /* @__PURE__ */ dual(2, (self, value2) => asUnit(acquireRelease(flatMap7(fiberRefGet(self), (oldValue) => as2(fiberRefSet(self, value2), oldValue)), (oldValue) => fiberRefSet(self, oldValue))));
var fiberRefLocallyScopedWith = /* @__PURE__ */ dual(2, (self, f) => fiberRefGetWith(self, (a) => fiberRefLocallyScoped(self, f(a))));
var currentRuntimeFlags = /* @__PURE__ */ fiberRefUnsafeMakeRuntimeFlags(none5);
var currentSupervisor = /* @__PURE__ */ fiberRefUnsafeMakeSupervisor(none8);
var fiberAwaitAll = (fibers) => asUnit(_await2(fiberAll(fibers)));
var fiberAll = (fibers) => ({
  [FiberTypeId]: fiberVariance,
  id: () => fromIterable(fibers).reduce((id, fiber) => combine8(id, fiber.id()), none4),
  await: () => exit(forEachParUnbounded(fibers, (fiber) => flatten5(fiber.await()), false)),
  children: () => map9(forEachParUnbounded(fibers, (fiber) => fiber.children(), false), flatten2),
  inheritAll: () => forEachSequentialDiscard(fibers, (fiber) => fiber.inheritAll()),
  poll: () => map9(forEachSequential(fibers, (fiber) => fiber.poll()), reduceRight(some2(exitSucceed(new Array())), (optionB, optionA) => {
    switch (optionA._tag) {
      case "None": {
        return none2();
      }
      case "Some": {
        switch (optionB._tag) {
          case "None": {
            return none2();
          }
          case "Some": {
            return some2(exitZipWith(optionA.value, optionB.value, {
              onSuccess: (a, chunk4) => [a, ...chunk4],
              onFailure: parallel
            }));
          }
        }
      }
    }
  })),
  interruptAsFork: (fiberId3) => forEachSequentialDiscard(fibers, (fiber) => fiber.interruptAsFork(fiberId3)),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
var raceWith = /* @__PURE__ */ dual(3, (self, other, options) => raceFibersWith(self, other, {
  onSelfWin: (winner, loser) => flatMap7(winner.await(), (exit3) => {
    switch (exit3._tag) {
      case OP_SUCCESS: {
        return flatMap7(winner.inheritAll(), () => options.onSelfDone(exit3, loser));
      }
      case OP_FAILURE: {
        return options.onSelfDone(exit3, loser);
      }
    }
  }),
  onOtherWin: (winner, loser) => flatMap7(winner.await(), (exit3) => {
    switch (exit3._tag) {
      case OP_SUCCESS: {
        return flatMap7(winner.inheritAll(), () => options.onOtherDone(exit3, loser));
      }
      case OP_FAILURE: {
        return options.onOtherDone(exit3, loser);
      }
    }
  })
}));
var disconnect = (self) => uninterruptibleMask((restore) => fiberIdWith((fiberId3) => flatMap7(forkDaemon(restore(self)), (fiber) => onInterrupt(() => interruptAsFork(fiberId3)(fiber))(restore(join2(fiber))))));
var race = /* @__PURE__ */ dual(2, (self, that) => fiberIdWith((parentFiberId) => raceWith(self, that, {
  onSelfDone: (exit3, right3) => exitMatchEffect(exit3, {
    onFailure: (cause3) => mapErrorCause((cause22) => parallel(cause3, cause22))(join2(right3)),
    onSuccess: (value2) => as2(value2)(interruptAsFiber(parentFiberId)(right3))
  }),
  onOtherDone: (exit3, left3) => exitMatchEffect(exit3, {
    onFailure: (cause3) => mapErrorCause((cause22) => parallel(cause22, cause3))(join2(left3)),
    onSuccess: (value2) => as2(value2)(interruptAsFiber(parentFiberId)(left3))
  })
})));
var raceFibersWith = /* @__PURE__ */ dual(3, (self, other, options) => withFiberRuntime((parentFiber, parentStatus) => {
  const parentRuntimeFlags = parentStatus.runtimeFlags;
  const raceIndicator = make8(true);
  const leftFiber = unsafeMakeChildFiber(self, parentFiber, parentRuntimeFlags, options.selfScope);
  const rightFiber = unsafeMakeChildFiber(other, parentFiber, parentRuntimeFlags, options.otherScope);
  return async((cb) => {
    leftFiber.unsafeAddObserver(() => completeRace(leftFiber, rightFiber, options.onSelfWin, raceIndicator, cb));
    rightFiber.unsafeAddObserver(() => completeRace(rightFiber, leftFiber, options.onOtherWin, raceIndicator, cb));
    leftFiber.startFork(self);
    rightFiber.startFork(other);
  }, combine8(leftFiber.id(), rightFiber.id()));
}));
var completeRace = (winner, loser, cont, ab, cb) => {
  if (compareAndSet(true, false)(ab)) {
    cb(cont(winner, loser));
  }
};
var ensuring = /* @__PURE__ */ dual(2, (self, finalizer) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => matchCauseEffect(finalizer, {
    onFailure: (cause22) => failCause(sequential(cause1, cause22)),
    onSuccess: () => failCause(cause1)
  }),
  onSuccess: (a) => as2(finalizer, a)
})));
var invokeWithInterrupt = (dataSource, all7) => fiberIdWith((id) => flatMap7(flatMap7(forkDaemon(interruptible2(dataSource)), (processing) => async((cb) => {
  const counts = all7.map((_) => _.listeners.count);
  const checkDone = () => {
    if (counts.every((count) => count === 0)) {
      cleanup.forEach((f) => f());
      cb(interruptFiber(processing));
    }
  };
  processing.unsafeAddObserver((exit3) => {
    cleanup.forEach((f) => f());
    cb(exit3);
  });
  const cleanup = all7.map((r, i) => {
    const observer = (count) => {
      counts[i] = count;
      checkDone();
    };
    r.listeners.addObserver(observer);
    return () => r.listeners.removeObserver(observer);
  });
  checkDone();
  return sync(() => {
    cleanup.forEach((f) => f());
  });
})), () => suspend(() => {
  const residual = all7.flatMap((entry) => {
    if (!entry.state.completed) {
      return [entry];
    }
    return [];
  });
  return forEachSequentialDiscard(residual, (entry) => complete(entry.request, exitInterrupt(id)));
})));
var useSpanScoped = (name, options) => acquireRelease(makeSpan(name, options), (span, exit3) => flatMap7(currentTimeNanosTracing, (endTime) => sync(() => span.end(endTime, exit3))));
var withSpanScoped = (name, options) => flatMap7(makeSpan(name, options), (span) => fiberRefLocallyScopedWith(currentTracerSpan, prepend3(span)));
var withTracerScoped = (value2) => fiberRefLocallyScopedWith(currentServices, add2(tracerTag, value2));
var withParentSpanScoped = (span) => fiberRefLocallyScopedWith(currentTracerSpan, prepend3(span));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/cache.mjs
var _a21;
var _b12;
var complete2 = (key2, exit3, entryStats, timeToLiveMillis) => struct({
  _tag: "Complete",
  key: key2,
  exit: exit3,
  entryStats,
  timeToLiveMillis
});
var pending2 = (key2, deferred) => struct({
  _tag: "Pending",
  key: key2,
  deferred
});
var refreshing = (deferred, complete3) => struct({
  _tag: "Refreshing",
  deferred,
  complete: complete3
});
var MapKeyTypeId = /* @__PURE__ */ Symbol.for("@effect/cache/Cache/MapKey");
var MapKeyImpl = class {
  constructor(current) {
    this.current = current;
    this[_a21] = MapKeyTypeId;
    this.previous = void 0;
    this.next = void 0;
  }
  [(_a21 = MapKeyTypeId, symbol)]() {
    return combine(hash(this.next))(combine(hash(this.previous))(hash(this.current)));
  }
  [symbol2](that) {
    if (this === that) {
      return true;
    }
    return isMapKey(that) && equals(this.current, that.current) && equals(this.previous, that.previous) && equals(this.next, that.next);
  }
};
var makeMapKey = (current) => new MapKeyImpl(current);
var isMapKey = (u) => typeof u === "object" && u != null && MapKeyTypeId in u;
var KeySetImpl = class {
  constructor() {
    this.head = void 0;
    this.tail = void 0;
  }
  add(key2) {
    if (key2 !== this.tail) {
      if (this.tail === void 0) {
        this.head = key2;
        this.tail = key2;
      } else {
        const previous = key2.previous;
        const next = key2.next;
        if (next !== void 0) {
          key2.next = void 0;
          if (previous !== void 0) {
            previous.next = next;
            next.previous = previous;
          } else {
            this.head = next;
            this.head.previous = void 0;
          }
        }
        this.tail.next = key2;
        key2.previous = this.tail;
        this.tail = key2;
      }
    }
  }
  remove() {
    const key2 = this.head;
    if (key2 !== void 0) {
      const next = key2.next;
      if (next !== void 0) {
        key2.next = void 0;
        this.head = next;
        this.head.previous = void 0;
      } else {
        this.head = void 0;
        this.tail = void 0;
      }
    }
    return key2;
  }
};
var makeKeySet = () => new KeySetImpl();
var makeCacheState = (map14, keys3, accesses, updating, hits, misses) => ({
  map: map14,
  keys: keys3,
  accesses,
  updating,
  hits,
  misses
});
var initialCacheState = () => makeCacheState(empty7(), makeKeySet(), unbounded(), make8(false), 0, 0);
var CacheSymbolKey = "@effect/cache/Cache";
var CacheTypeId = /* @__PURE__ */ Symbol.for(CacheSymbolKey);
var cacheVariance = {
  _Key: (_) => _,
  _Error: (_) => _,
  _Value: (_) => _
};
var makeCacheStats = (options) => options;
var makeEntryStats = (loadedMillis) => ({
  loadedMillis
});
var CacheImpl = class {
  constructor(capacity, context4, fiberId3, lookup, timeToLive) {
    this.capacity = capacity;
    this.context = context4;
    this.fiberId = fiberId3;
    this.lookup = lookup;
    this.timeToLive = timeToLive;
    this[_b12] = cacheVariance;
    this.cacheState = initialCacheState();
  }
  get(key2) {
    return map9(this.getEither(key2), merge);
  }
  cacheStats() {
    return sync(() => makeCacheStats({
      hits: this.cacheState.hits,
      misses: this.cacheState.misses,
      size: size4(this.cacheState.map)
    }));
  }
  getOption(key2) {
    return suspend(() => match2(get7(this.cacheState.map, key2), {
      onNone: () => {
        const mapKey = makeMapKey(key2);
        this.trackAccess(mapKey);
        this.trackMiss();
        return succeed(none2());
      },
      onSome: (value2) => this.resolveMapValue(value2)
    }));
  }
  getOptionComplete(key2) {
    return suspend(() => match2(get7(this.cacheState.map, key2), {
      onNone: () => {
        const mapKey = makeMapKey(key2);
        this.trackAccess(mapKey);
        this.trackMiss();
        return succeed(none2());
      },
      onSome: (value2) => this.resolveMapValue(value2, true)
    }));
  }
  contains(key2) {
    return sync(() => has3(this.cacheState.map, key2));
  }
  entryStats(key2) {
    return sync(() => {
      const option6 = get7(this.cacheState.map, key2);
      if (isSome2(option6)) {
        switch (option6.value._tag) {
          case "Complete": {
            const loaded = option6.value.entryStats.loadedMillis;
            return some2(makeEntryStats(loaded));
          }
          case "Pending": {
            return none2();
          }
          case "Refreshing": {
            const loaded = option6.value.complete.entryStats.loadedMillis;
            return some2(makeEntryStats(loaded));
          }
        }
      }
      return none2();
    });
  }
  getEither(key2) {
    return suspend(() => {
      const k = key2;
      let mapKey = void 0;
      let deferred = void 0;
      let value2 = getOrUndefined(get7(this.cacheState.map, k));
      if (value2 === void 0) {
        deferred = unsafeMake3(this.fiberId);
        mapKey = makeMapKey(k);
        if (has3(this.cacheState.map, k)) {
          value2 = getOrUndefined(get7(this.cacheState.map, k));
        } else {
          set4(this.cacheState.map, k, pending2(mapKey, deferred));
        }
      }
      if (value2 === void 0) {
        this.trackAccess(mapKey);
        this.trackMiss();
        return map9(this.lookupValueOf(key2, deferred), right2);
      } else {
        return flatMap7(this.resolveMapValue(value2), match2({
          onNone: () => this.getEither(key2),
          onSome: (value3) => succeed(left2(value3))
        }));
      }
    });
  }
  invalidate(key2) {
    return sync(() => {
      remove4(this.cacheState.map, key2);
    });
  }
  invalidateWhen(key2, when4) {
    return sync(() => {
      const value2 = get7(this.cacheState.map, key2);
      if (isSome2(value2) && value2.value._tag === "Complete") {
        if (value2.value.exit._tag === "Success") {
          if (when4(value2.value.exit.value)) {
            remove4(this.cacheState.map, key2);
          }
        }
      }
    });
  }
  invalidateAll() {
    return sync(() => {
      this.cacheState.map = empty7();
    });
  }
  refresh(key2) {
    return clockWith3((clock3) => suspend(() => {
      const k = key2;
      const deferred = unsafeMake3(this.fiberId);
      let value2 = getOrUndefined(get7(this.cacheState.map, k));
      if (value2 === void 0) {
        if (has3(this.cacheState.map, k)) {
          value2 = getOrUndefined(get7(this.cacheState.map, k));
        } else {
          set4(this.cacheState.map, k, pending2(makeMapKey(k), deferred));
        }
      }
      if (value2 === void 0) {
        return asUnit(this.lookupValueOf(key2, deferred));
      } else {
        switch (value2._tag) {
          case "Complete": {
            if (this.hasExpired(clock3, value2.timeToLiveMillis)) {
              const found = getOrUndefined(get7(this.cacheState.map, k));
              if (equals(found, value2)) {
                remove4(this.cacheState.map, k);
              }
              return asUnit(this.get(key2));
            }
            return asUnit(when(() => {
              const current = getOrUndefined(get7(this.cacheState.map, k));
              if (equals(current, value2)) {
                const mapValue = refreshing(deferred, value2);
                set4(this.cacheState.map, k, mapValue);
                return true;
              }
              return false;
            })(this.lookupValueOf(key2, deferred)));
          }
          case "Pending": {
            return _await(value2.deferred);
          }
          case "Refreshing": {
            return _await(value2.deferred);
          }
        }
      }
    }));
  }
  set(key2, value2) {
    return clockWith3((clock3) => sync(() => {
      const now = clock3.unsafeCurrentTimeMillis();
      const k = key2;
      const lookupResult = succeed2(value2);
      const mapValue = complete2(makeMapKey(k), lookupResult, makeEntryStats(now), now + toMillis(decode(this.timeToLive(lookupResult))));
      set4(this.cacheState.map, k, mapValue);
    }));
  }
  size() {
    return sync(() => {
      return size4(this.cacheState.map);
    });
  }
  values() {
    return sync(() => {
      const values3 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          values3.push(entry[1].exit.value);
        }
      }
      return values3;
    });
  }
  entries() {
    return sync(() => {
      const values3 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          values3.push([entry[0], entry[1].exit.value]);
        }
      }
      return values3;
    });
  }
  keys() {
    return sync(() => {
      const keys3 = [];
      for (const entry of this.cacheState.map) {
        if (entry[1]._tag === "Complete" && entry[1].exit._tag === "Success") {
          keys3.push(entry[0]);
        }
      }
      return keys3;
    });
  }
  resolveMapValue(value2, ignorePending = false) {
    return clockWith3((clock3) => {
      switch (value2._tag) {
        case "Complete": {
          this.trackAccess(value2.key);
          this.trackHit();
          if (this.hasExpired(clock3, value2.timeToLiveMillis)) {
            remove4(this.cacheState.map, value2.key.current);
            return succeed(none2());
          }
          return map9(value2.exit, some2);
        }
        case "Pending": {
          this.trackAccess(value2.key);
          this.trackHit();
          if (ignorePending) {
            return succeed(none2());
          }
          return map9(_await(value2.deferred), some2);
        }
        case "Refreshing": {
          this.trackAccess(value2.complete.key);
          this.trackHit();
          if (this.hasExpired(clock3, value2.complete.timeToLiveMillis)) {
            if (ignorePending) {
              return succeed(none2());
            }
            return map9(_await(value2.deferred), some2);
          }
          return map9(value2.complete.exit, some2);
        }
      }
    });
  }
  trackHit() {
    this.cacheState.hits = this.cacheState.hits + 1;
  }
  trackMiss() {
    this.cacheState.misses = this.cacheState.misses + 1;
  }
  trackAccess(key2) {
    offer(this.cacheState.accesses, key2);
    if (compareAndSet(this.cacheState.updating, false, true)) {
      let loop3 = true;
      while (loop3) {
        const key3 = poll(this.cacheState.accesses, EmptyMutableQueue);
        if (key3 === EmptyMutableQueue) {
          loop3 = false;
        } else {
          this.cacheState.keys.add(key3);
        }
      }
      let size8 = size4(this.cacheState.map);
      loop3 = size8 > this.capacity;
      while (loop3) {
        const key3 = this.cacheState.keys.remove();
        if (key3 !== void 0) {
          if (has3(this.cacheState.map, key3.current)) {
            remove4(this.cacheState.map, key3.current);
            size8 = size8 - 1;
            loop3 = size8 > this.capacity;
          }
        } else {
          loop3 = false;
        }
      }
      set3(this.cacheState.updating, false);
    }
  }
  hasExpired(clock3, timeToLiveMillis) {
    return clock3.unsafeCurrentTimeMillis() > timeToLiveMillis;
  }
  lookupValueOf(input, deferred) {
    return clockWith3((clock3) => suspend(() => {
      const key2 = input;
      return onInterrupt(() => zipRight(interrupt3(deferred), sync(() => {
        remove4(this.cacheState.map, key2);
      })))(flatMap7((exit3) => {
        const now = clock3.unsafeCurrentTimeMillis();
        const stats = makeEntryStats(now);
        const value2 = complete2(makeMapKey(key2), exit3, stats, now + toMillis(decode(this.timeToLive(exit3))));
        set4(this.cacheState.map, key2, value2);
        return zipRight(done2(deferred, exit3), exit3);
      })(exit(provideContext(this.context)(this.lookup(input)))));
    }));
  }
};
_b12 = CacheTypeId;
var unsafeMakeWith = (capacity, lookup, timeToLive) => new CacheImpl(capacity, empty3(), none3, lookup, (exit3) => decode(timeToLive(exit3)));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/schedule/interval.mjs
var IntervalSymbolKey = "@effect/io/Schedule/Interval";
var IntervalTypeId = /* @__PURE__ */ Symbol.for(IntervalSymbolKey);
var empty23 = {
  [IntervalTypeId]: IntervalTypeId,
  startMillis: 0,
  endMillis: 0
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Schedule/Interval.mjs
var empty24 = empty23;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/schedule/intervals.mjs
var start = (self) => {
  return getOrElse(() => empty24)(head2(self.intervals)).startMillis;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Schedule/Intervals.mjs
var start2 = start;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/schedule/decision.mjs
var OP_DONE2 = "Done";
var isDone3 = (self) => {
  return self._tag === OP_DONE2;
};

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Schedule/Decision.mjs
var isDone4 = isDone3;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/schedule.mjs
var _a22;
var _b13;
var ScheduleSymbolKey = "@effect/io/Schedule";
var ScheduleTypeId = /* @__PURE__ */ Symbol.for(ScheduleSymbolKey);
var ScheduleDriverSymbolKey = "@effect/io/Schedule/Driver";
var ScheduleDriverTypeId = /* @__PURE__ */ Symbol.for(ScheduleDriverSymbolKey);
var scheduleDriverVariance = {
  _Env: (_) => _,
  _In: (_) => _,
  _Out: (_) => _
};
_a22 = ScheduleTypeId;
var ScheduleDriverImpl = class {
  constructor(schedule2, ref) {
    this.schedule = schedule2;
    this.ref = ref;
    this[_b13] = scheduleDriverVariance;
  }
  state() {
    return map9(get10(this.ref), (tuple4) => tuple4[1]);
  }
  last() {
    return flatMap7(get10(this.ref), ([element, _]) => {
      switch (element._tag) {
        case "None": {
          return failSync(() => NoSuchElementException());
        }
        case "Some": {
          return succeed(element.value);
        }
      }
    });
  }
  reset() {
    return set5(this.ref, [none2(), this.schedule.initial]);
  }
  next(input) {
    return flatMap7((state) => flatMap7((now) => flatMap7(([state2, out, decision]) => isDone4(decision) ? zipRight(fail2(none2()))(set5(this.ref, [some2(out), state2])) : as2(out)(zipRight(sleep3(millis(start2(decision.intervals) - now)))(set5(this.ref, [some2(out), state2]))))(suspend(() => this.schedule.step(now, input, state))))(currentTimeMillis2))(map9(get10(this.ref), (tuple4) => tuple4[1]));
  }
};
_b13 = ScheduleDriverTypeId;
var driver = (self) => map9((ref) => new ScheduleDriverImpl(self, ref))(make25([none2(), self.initial]));
var repeat_Effect = /* @__PURE__ */ dual(2, (self, schedule2) => repeatOrElse_Effect(self, schedule2, (e, _) => fail2(e)));
var repeatOrElse_Effect = /* @__PURE__ */ dual(3, (self, schedule2, orElse7) => flatMap7(driver(schedule2), (driver2) => matchEffect(self, {
  onFailure: (error2) => orElse7(error2, none2()),
  onSuccess: (value2) => repeatOrElseEffectLoop(self, driver2, orElse7, value2)
})));
var repeatOrElseEffectLoop = (self, driver2, orElse7, value2) => {
  return matchEffect(driver2.next(value2), {
    onFailure: () => orDie(driver2.last()),
    onSuccess: (b) => matchEffect(self, {
      onFailure: (error2) => orElse7(error2, some2(b)),
      onSuccess: (value3) => repeatOrElseEffectLoop(self, driver2, orElse7, value3)
    })
  });
};
var repeatUntil_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatUntilEffect_Effect(self, (a) => sync(() => f(a))));
var repeatUntilEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => flatMap7(self, (a) => flatMap7(f(a), (result) => result ? succeed(a) : flatMap7(yieldNow(), () => repeatUntilEffect_Effect(self, f)))));
var repeatWhile_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatWhileEffect_Effect(self, (a) => sync(() => f(a))));
var repeatWhileEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => repeatUntilEffect_Effect(self, (a) => negate(f(a))));
var retry_Effect = /* @__PURE__ */ dual(2, (self, policy) => retryOrElse_Effect(self, policy, (e, _) => fail2(e)));
var retryN_Effect = /* @__PURE__ */ dual(2, (self, n) => retryN_EffectLoop(self, n));
var retryN_EffectLoop = (self, n) => {
  return catchAll(self, (e) => n < 0 ? fail2(e) : flatMap7(yieldNow(), () => retryN_EffectLoop(self, n - 1)));
};
var retryOrElse_Effect = /* @__PURE__ */ dual(3, (self, policy, orElse7) => flatMap7(driver(policy), (driver2) => retryOrElse_EffectLoop(self, driver2, orElse7)));
var retryOrElse_EffectLoop = (self, driver2, orElse7) => {
  return catchAll(self, (e) => matchEffect(driver2.next(e), {
    onFailure: () => flatMap7((out) => orElse7(e, out))(orDie(driver2.last())),
    onSuccess: () => retryOrElse_EffectLoop(self, driver2, orElse7)
  }));
};
var retryUntil_Effect = /* @__PURE__ */ dual(2, (self, f) => retryUntilEffect_Effect(self, (e) => sync(() => f(e))));
var retryUntilEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => catchAll(self, (e) => flatMap7(f(e), (b) => b ? fail2(e) : flatMap7(yieldNow(), () => retryUntilEffect_Effect(self, f)))));
var retryWhile_Effect = /* @__PURE__ */ dual(2, (self, f) => retryWhileEffect_Effect(self, (e) => sync(() => f(e))));
var retryWhileEffect_Effect = /* @__PURE__ */ dual(2, (self, f) => retryUntilEffect_Effect(self, (e) => negate(f(e))));
var schedule_Effect = /* @__PURE__ */ dual(2, (self, schedule2) => scheduleFrom_Effect(self, void 0, schedule2));
var scheduleFrom_Effect = /* @__PURE__ */ dual(3, (self, initial, schedule2) => flatMap7(driver(schedule2), (driver2) => scheduleFrom_EffectLoop(self, initial, driver2)));
var scheduleFrom_EffectLoop = (self, initial, driver2) => matchEffect(driver2.next(initial), {
  onFailure: () => orDie(driver2.last()),
  onSuccess: () => flatMap7(self, (a) => scheduleFrom_EffectLoop(self, a, driver2))
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/effect/circular.mjs
var _a23;
var _b14;
var _c8;
var Semaphore = class {
  constructor(permits) {
    this.permits = permits;
    this.waiters = new Array();
    this.taken = 0;
    this.take = (n) => asyncEither((resume2) => {
      if (this.free < n) {
        const observer = () => {
          if (this.free >= n) {
            const observerIndex = this.waiters.findIndex((cb) => cb === observer);
            if (observerIndex !== -1) {
              this.waiters.splice(observerIndex, 1);
            }
            this.taken += n;
            resume2(succeed(n));
          }
        };
        this.waiters.push(observer);
        return left2(sync(() => {
          const observerIndex = this.waiters.findIndex((cb) => cb === observer);
          if (observerIndex !== -1) {
            this.waiters.splice(observerIndex, 1);
          }
        }));
      }
      this.taken += n;
      return right2(succeed(n));
    });
    this.release = (n) => withFiberRuntime((fiber) => {
      this.taken -= n;
      fiber.getFiberRef(currentScheduler).scheduleTask(() => {
        this.waiters.forEach((wake) => wake());
      }, fiber.getFiberRef(currentSchedulingPriority));
      return unit;
    });
    this.withPermits = (n) => (self) => uninterruptibleMask((restore) => flatMap7(restore(this.take(n)), (permits2) => ensuring(restore(self), this.release(permits2))));
  }
  get free() {
    return this.permits - this.taken;
  }
};
var unsafeMakeSemaphore = (leases) => {
  return new Semaphore(leases);
};
var makeSemaphore = (permits) => sync(() => unsafeMakeSemaphore(permits));
var awaitAllChildren = (self) => ensuringChildren(self, fiberAwaitAll);
var cached = /* @__PURE__ */ dual(2, (self, timeToLive) => map9(cachedInvalidate(self, timeToLive), (tuple4) => tuple4[0]));
var cachedInvalidate = /* @__PURE__ */ dual(2, (self, timeToLive) => {
  const duration = decode(timeToLive);
  return flatMap7(context(), (env) => map9(makeSynchronized(none2()), (cache) => [provideContext(getCachedValue(self, duration, cache), env), invalidateCache(cache)]));
});
var computeCachedValue = (self, timeToLive, start3) => {
  const timeToLiveMillis = toMillis(decode(timeToLive));
  return map9((deferred) => some2([start3 + timeToLiveMillis, deferred]))(tap((deferred) => intoDeferred(self, deferred))(deferredMake()));
};
var getCachedValue = (self, timeToLive, cache) => uninterruptibleMask((restore) => flatMap7((option6) => isNone2(option6) ? dieMessage("BUG: Effect.cachedInvalidate - please report an issue at https://github.com/Effect-TS/io/issues") : restore(deferredAwait(option6.value[1])))(flatMap7((time) => updateSomeAndGetEffectSynchronized(cache, (option6) => {
  switch (option6._tag) {
    case "None": {
      return some2(computeCachedValue(self, timeToLive, time));
    }
    case "Some": {
      const [end3] = option6.value;
      return end3 - time <= 0 ? some2(computeCachedValue(self, timeToLive, time)) : none2();
    }
  }
}))(clockWith3((clock3) => clock3.currentTimeMillis))));
var invalidateCache = (cache) => set5(cache, none2());
var ensuringChild = /* @__PURE__ */ dual(2, (self, f) => ensuringChildren(self, (children) => f(fiberAll(children))));
var ensuringChildren = /* @__PURE__ */ dual(2, (self, children) => flatMap7(track, (supervisor) => ensuring(flatMap7(supervisor.value(), children))(supervised(self, supervisor))));
var forkAll = /* @__PURE__ */ dual((args) => isIterable(args[0]), (effects, options) => options?.discard ? forEachSequentialDiscard(effects, fork) : map9(forEachSequential(effects, fork), fiberAll));
var forkIn = /* @__PURE__ */ dual(2, (self, scope3) => uninterruptibleMask((restore) => flatMap7(scope3.fork(sequential2), (child) => tap((fiber) => child.addFinalizer(() => fiberIdWith((fiberId3) => equals(fiberId3, fiber.id()) ? unit : asUnit(interruptFiber(fiber)))))(forkDaemon(onExit((exit3) => child.close(exit3))(restore(self)))))));
var forkScoped = (self) => scopeWith((scope3) => forkIn(self, scope3));
var fromFiber = (fiber) => join2(fiber);
var fromFiberEffect = (fiber) => suspend(() => flatMap7(fiber, join2));
var memoKeySymbol = /* @__PURE__ */ Symbol.for("@effect/io/Effect/memoizeFunction.key");
var Key = class {
  constructor(a, eq) {
    this.a = a;
    this.eq = eq;
    this[_a23] = memoKeySymbol;
  }
  [(_a23 = memoKeySymbol, symbol2)](that) {
    if (typeof that === "object" && that !== null && memoKeySymbol in that) {
      if (this.eq) {
        return this.eq(this.a, that.a);
      } else {
        return equals(this.a, that.a);
      }
    }
    return false;
  }
  [symbol]() {
    return this.eq ? 0 : hash(this.a);
  }
};
var memoizeFunction = (f, eq) => {
  return map9((ref) => (a) => flatMap7(([patch11, b]) => as2(b)(patchFiberRefs(patch11)))(flatMap7(deferredAwait)(ref.modifyEffect((map14) => {
    const result = get7(new Key(a, eq))(map14);
    if (isNone2(result)) {
      return map9((deferred) => [deferred, set4(new Key(a, eq), deferred)(map14)])(tap((deferred) => fork(intoDeferred(deferred)(diffFiberRefs(f(a)))))(deferredMake()));
    }
    return succeed([result.value, map14]);
  }))))(flatMap7(makeSynchronized)(sync(() => empty7())));
};
var raceFirst = /* @__PURE__ */ dual(2, (self, that) => ((effect) => flatten5(effect))(race(exit(that))(exit(self))));
var scheduleForked = /* @__PURE__ */ dual(2, (self, schedule2) => forkScoped(schedule_Effect(schedule2)(self)));
var supervised = /* @__PURE__ */ dual(2, (self, supervisor) => {
  const supervise = fiberRefLocallyWith(currentSupervisor, (s) => s.zip(supervisor));
  return supervise(self);
});
var timeout = /* @__PURE__ */ dual(2, (self, duration) => timeoutTo(self, {
  onTimeout: none2,
  onSuccess: some2,
  duration
}));
var timeoutFail = /* @__PURE__ */ dual(2, (self, {
  duration,
  onTimeout
}) => flatten5(timeoutTo(self, {
  onTimeout: () => failSync(onTimeout),
  onSuccess: succeed,
  duration
})));
var timeoutFailCause = /* @__PURE__ */ dual(2, (self, {
  duration,
  onTimeout
}) => flatten5(timeoutTo(self, {
  onTimeout: () => failCauseSync(onTimeout),
  onSuccess: succeed,
  duration
})));
var timeoutTo = /* @__PURE__ */ dual(2, (self, {
  duration,
  onSuccess,
  onTimeout
}) => fiberIdWith((parentFiberId) => raceFibersWith(self, interruptible2(sleep3(duration)), {
  onSelfWin: (winner, loser) => flatMap7(winner.await(), (exit3) => {
    if (exit3._tag === "Success") {
      return flatMap7(winner.inheritAll(), () => as2(interruptAsFiber(loser, parentFiberId), onSuccess(exit3.value)));
    } else {
      return flatMap7(interruptAsFiber(loser, parentFiberId), () => exitFailCause(exit3.cause));
    }
  }),
  onOtherWin: (winner, loser) => flatMap7(winner.await(), (exit3) => {
    if (exit3._tag === "Success") {
      return flatMap7(winner.inheritAll(), () => as2(interruptAsFiber(loser, parentFiberId), onTimeout()));
    } else {
      return flatMap7(interruptAsFiber(loser, parentFiberId), () => exitFailCause(exit3.cause));
    }
  }),
  otherScope: globalScope
})));
var SynchronizedSymbolKey = "@effect/io/Ref/Synchronized";
var SynchronizedTypeId = /* @__PURE__ */ Symbol.for(SynchronizedSymbolKey);
var synchronizedVariance = {
  _A: (_) => _
};
var SynchronizedImpl = class {
  constructor(ref, withLock) {
    this.ref = ref;
    this.withLock = withLock;
    this[_b14] = synchronizedVariance;
    this[_c8] = refVariance;
  }
  modify(f) {
    return this.modifyEffect((a) => succeed(f(a)));
  }
  modifyEffect(f) {
    return this.withLock(flatMap7(([b, a]) => as2(set5(this.ref, a), b))(flatMap7(get10(this.ref), f)));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
_b14 = SynchronizedTypeId, _c8 = RefTypeId;
var makeSynchronized = (value2) => sync(() => unsafeMakeSynchronized(value2));
var unsafeMakeSynchronized = (value2) => {
  const ref = unsafeMake6(value2);
  const sem = unsafeMakeSemaphore(1);
  return new SynchronizedImpl(ref, sem.withPermits(1));
};
var updateSomeAndGetEffectSynchronized = /* @__PURE__ */ dual(2, (self, pf) => self.modifyEffect((value2) => {
  const result = pf(value2);
  switch (result._tag) {
    case "None": {
      return succeed([value2, value2]);
    }
    case "Some": {
      return map9(result.value, (a) => [a, a]);
    }
  }
}));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/opCodes/layer.mjs
var OP_FRESH = "Fresh";
var OP_FROM_EFFECT = "FromEffect";
var OP_SCOPED = "Scoped";
var OP_SUSPEND = "Suspend";
var OP_ZIP_WITH_PAR = "ZipWithPar";

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Fiber.mjs
var interruptAs = interruptAsFiber;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/runtime.mjs
var unsafeFork2 = (runtime4) => (self, options) => {
  const fiberId3 = unsafeMake2();
  const effect = self;
  let fiberRefs2 = updatedAs2(runtime4.fiberRefs, {
    fiberId: fiberId3,
    fiberRef: currentContext,
    value: runtime4.context
  });
  if (options?.scheduler) {
    fiberRefs2 = updatedAs2(fiberRefs2, {
      fiberId: fiberId3,
      fiberRef: currentScheduler,
      value: options.scheduler
    });
  }
  if (options?.updateRefs) {
    fiberRefs2 = options.updateRefs(fiberRefs2, fiberId3);
  }
  const fiberRuntime = new FiberRuntime(fiberId3, forkAs2(fiberRefs2, fiberId3), runtime4.runtimeFlags);
  const supervisor = fiberRuntime._supervisor;
  if (supervisor !== none8) {
    supervisor.onStart(runtime4.context, effect, none2(), fiberRuntime);
    fiberRuntime.unsafeAddObserver((exit3) => supervisor.onEnd(exit3, fiberRuntime));
  }
  globalScope.add(runtime4.runtimeFlags, fiberRuntime);
  fiberRuntime.start(effect);
  return fiberRuntime;
};
var unsafeRunCallback = (runtime4) => (effect, onExit3) => {
  const fiberRuntime = unsafeFork2(runtime4)(effect);
  if (onExit3) {
    fiberRuntime.unsafeAddObserver((exit3) => {
      onExit3(exit3);
    });
  }
  return (id, onExitInterrupt) => unsafeRunCallback(runtime4)(interruptAs(id ?? none4)(fiberRuntime), onExitInterrupt ? (exit3) => onExitInterrupt(flatten6(exit3)) : void 0);
};
var unsafeRunSync = (runtime4) => (effect) => {
  const result = unsafeRunSyncExit(runtime4)(effect);
  if (result._tag === "Failure") {
    throw fiberFailure(result.i0);
  } else {
    return result.i0;
  }
};
var asyncFiberException = (fiber) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error2 = new Error();
  Error.stackTraceLimit = limit;
  const message = `Fiber #${fiber.id().id} cannot be be resolved synchronously, this is caused by using runSync on an effect that performs async work`;
  const _tag = "AsyncFiberException";
  Object.defineProperties(error2, {
    _tag: {
      value: _tag
    },
    message: {
      value: message
    },
    name: {
      value: _tag
    },
    toString: {
      get() {
        return () => message;
      }
    },
    [NodePrint]: {
      get() {
        return () => message;
      }
    }
  });
  return error2;
};
var FiberFailureId = /* @__PURE__ */ Symbol.for("@effect/io/Runtime/FiberFailure");
var FiberFailureCauseId = /* @__PURE__ */ Symbol.for("@effect/io/Runtime/FiberFailure/Cause");
var NodePrint = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var fiberFailure = (cause3) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error2 = new Error();
  Error.stackTraceLimit = limit;
  const pretty3 = prettyErrors(cause3);
  if (pretty3.length > 0) {
    error2.name = pretty3[0].message.split(":")[0];
    error2.message = pretty3[0].message.substring(error2.name.length + 2);
    error2.stack = `${error2.name}: ${error2.message}
${pretty3[0].stack}`;
  }
  error2[FiberFailureId] = FiberFailureId;
  error2[FiberFailureCauseId] = cause3;
  error2.toString = () => {
    return pretty(cause3);
  };
  error2[NodePrint] = () => {
    return error2.toString();
  };
  return error2;
};
var fastPath = (effect) => {
  const op = effect;
  switch (op._tag) {
    case "Failure":
    case "Success": {
      return op;
    }
    case "Left": {
      return exitFail(op.left);
    }
    case "Right": {
      return exitSucceed(op.right);
    }
    case "Some": {
      return exitSucceed(op.value);
    }
    case "None": {
      return exitFail(NoSuchElementException());
    }
  }
};
var unsafeRunSyncExit = (runtime4) => (effect) => {
  const op = fastPath(effect);
  if (op) {
    return op;
  }
  const scheduler = new SyncScheduler();
  const fiberRuntime = unsafeFork2(runtime4)(effect, {
    scheduler
  });
  scheduler.flush();
  const result = fiberRuntime.unsafePoll();
  if (result) {
    return result;
  }
  throw asyncFiberException(fiberRuntime);
};
var unsafeRunPromise = (runtime4) => (effect) => unsafeRunPromiseExit(runtime4)(effect).then((result) => {
  switch (result._tag) {
    case OP_SUCCESS: {
      return result.i0;
    }
    case OP_FAILURE: {
      throw fiberFailure(result.i0);
    }
  }
});
var unsafeRunPromiseExit = (runtime4) => (effect) => new Promise((resolve) => {
  const op = fastPath(effect);
  if (op) {
    resolve(op);
  }
  unsafeFork2(runtime4)(effect).unsafeAddObserver((exit3) => {
    resolve(exit3);
  });
});
var RuntimeImpl = class {
  constructor(context4, runtimeFlags3, fiberRefs2) {
    this.context = context4;
    this.runtimeFlags = runtimeFlags3;
    this.fiberRefs = fiberRefs2;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make33 = (options) => new RuntimeImpl(options.context, options.flags, options.fiberRefs);
var runtime2 = () => withFiberRuntime((state, status) => succeed(new RuntimeImpl(state.getFiberRef(currentContext), status.runtimeFlags, state.unsafeGetFiberRefs())));
var defaultRuntimeFlags = /* @__PURE__ */ make14(Interruption, CooperativeYielding, RuntimeMetrics);
var defaultRuntime = /* @__PURE__ */ make33({
  context: /* @__PURE__ */ empty3(),
  flags: defaultRuntimeFlags,
  fiberRefs: /* @__PURE__ */ unsafeMake5(/* @__PURE__ */ new Map())
});
var unsafeRunEffect = /* @__PURE__ */ unsafeRunCallback(defaultRuntime);
var unsafeForkEffect = /* @__PURE__ */ unsafeFork2(defaultRuntime);
var unsafeRunPromiseEffect = /* @__PURE__ */ unsafeRunPromise(defaultRuntime);
var unsafeRunPromiseExitEffect = /* @__PURE__ */ unsafeRunPromiseExit(defaultRuntime);
var unsafeRunSyncEffect = /* @__PURE__ */ unsafeRunSync(defaultRuntime);
var unsafeRunSyncExitEffect = /* @__PURE__ */ unsafeRunSyncExit(defaultRuntime);
var asyncEffect = (register) => flatMap7(deferredMake(), (deferred) => flatMap7(runtime2(), (runtime4) => uninterruptibleMask((restore) => zipRight(fork(restore(catchAllCause(register((cb) => unsafeRunCallback(runtime4)(intoDeferred(cb, deferred))), (cause3) => deferredFailCause(deferred, cause3)))), restore(deferredAwait(deferred))))));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/synchronizedRef.mjs
var modifyEffect = /* @__PURE__ */ dual(2, (self, f) => self.modifyEffect(f));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/layer.mjs
var LayerSymbolKey = "@effect/io/Layer";
var LayerTypeId = /* @__PURE__ */ Symbol.for(LayerSymbolKey);
var layerVariance = {
  _RIn: (_) => _,
  _E: (_) => _,
  _ROut: (_) => _
};
var proto5 = {
  [LayerTypeId]: layerVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isFresh = (self) => {
  return self._tag === OP_FRESH;
};
var MemoMap = class {
  constructor(ref) {
    this.ref = ref;
  }
  /**
   * Checks the memo map to see if a layer exists. If it is, immediately
   * returns it. Otherwise, obtains the layer, stores it in the memo map,
   * and adds a finalizer to the `Scope`.
   */
  getOrElseMemoize(layer, scope3) {
    return flatten5(modifyEffect(this.ref, (map14) => {
      const inMap = map14.get(layer);
      if (inMap !== void 0) {
        const [acquire, release] = inMap;
        const cached3 = onExit(exitMatch({
          onFailure: () => unit,
          onSuccess: () => scopeAddFinalizerExit(scope3, release)
        }))(flatMap7(([patch11, b]) => as2(b)(patchFiberRefs(patch11)))(acquire));
        return succeed([cached3, map14]);
      }
      return flatMap7((observers) => flatMap7((deferred) => map9((finalizerRef) => {
        const resource = uninterruptibleMask((restore) => flatMap7((innerScope) => flatMap7((exit3) => {
          switch (exit3._tag) {
            case OP_FAILURE: {
              return zipRight(failCause(exit3.i0))(zipRight(scopeClose(innerScope, exit3))(deferredFailCause(deferred, exit3.i0)));
            }
            case OP_SUCCESS: {
              return as2(exit3.i0[1])(zipRight(deferredSucceed(deferred, exit3.i0))(zipRight(scopeAddFinalizerExit(scope3, (exit4) => flatMap7((finalizer) => finalizer(exit4))(get10(finalizerRef))))(zipRight(update4(observers, (n) => n + 1))(set5(finalizerRef, (exit4) => asUnit(whenEffect(modify3(observers, (n) => [n === 1, n - 1]))(scopeClose(innerScope, exit4))))))));
            }
          }
        })(exit(restore(flatMap7(withScope(layer, innerScope), (f) => diffFiberRefs(f(this)))))))(scopeMake()));
        const memoized = [onExit(exitMatchEffect({
          onFailure: () => unit,
          onSuccess: () => update4(observers, (n) => n + 1)
        }))(deferredAwait(deferred)), (exit3) => flatMap7((finalizer) => finalizer(exit3))(get10(finalizerRef))];
        return [resource, isFresh(layer) ? map14 : map14.set(layer, memoized)];
      })(make25(() => unit)))(deferredMake()))(make25(0));
    }));
  }
};
var makeMemoMap = () => map9(makeSynchronized(/* @__PURE__ */ new Map()), (ref) => new MemoMap(ref));
var buildWithScope = /* @__PURE__ */ dual(2, (self, scope3) => flatMap7(makeMemoMap(), (memoMap) => flatMap7(withScope(self, scope3), (run) => run(memoMap))));
var withScope = (self, scope3) => {
  const op = self;
  switch (op._tag) {
    case "Locally": {
      return sync(() => (memoMap) => op.f(memoMap.getOrElseMemoize(op.self, scope3)));
    }
    case "ExtendScope": {
      return sync(() => (memoMap) => scopeWith((scope4) => memoMap.getOrElseMemoize(op.layer, scope4)));
    }
    case "Fold": {
      return sync(() => (memoMap) => matchCauseEffect({
        onFailure: (cause3) => memoMap.getOrElseMemoize(op.failureK(cause3), scope3),
        onSuccess: (value2) => memoMap.getOrElseMemoize(op.successK(value2), scope3)
      })(memoMap.getOrElseMemoize(op.layer, scope3)));
    }
    case "Fresh": {
      return sync(() => (_) => buildWithScope(scope3)(op.layer));
    }
    case "FromEffect": {
      return sync(() => (_) => op.effect);
    }
    case "ProvideTo": {
      return sync(() => (memoMap) => flatMap7((env) => provideContext(env)(memoMap.getOrElseMemoize(op.second, scope3)))(memoMap.getOrElseMemoize(op.first, scope3)));
    }
    case "Scoped": {
      return sync(() => (_) => scopeExtend(op.effect, scope3));
    }
    case "Suspend": {
      return sync(() => (memoMap) => memoMap.getOrElseMemoize(op.evaluate(), scope3));
    }
    case "ZipWith": {
      return sync(() => (memoMap) => zipWith2(memoMap.getOrElseMemoize(op.second, scope3), op.zipK)(memoMap.getOrElseMemoize(op.first, scope3)));
    }
    case "ZipWithPar": {
      return sync(() => (memoMap) => zipWithOptions(memoMap.getOrElseMemoize(op.second, scope3), op.zipK, {
        concurrent: true
      })(memoMap.getOrElseMemoize(op.first, scope3)));
    }
  }
};
var context2 = () => fromEffectContext(context());
function fromEffectContext(effect) {
  const fromEffect2 = Object.create(proto5);
  fromEffect2._tag = OP_FROM_EFFECT;
  fromEffect2.effect = effect;
  return fromEffect2;
}
var merge6 = /* @__PURE__ */ dual(2, (self, that) => zipWithPar(self, that, (a, b) => merge3(b)(a)));
var scopedDiscard = (effect) => {
  return scopedContext(as2(empty3())(effect));
};
var scopedContext = (effect) => {
  const scoped2 = Object.create(proto5);
  scoped2._tag = OP_SCOPED;
  scoped2.effect = effect;
  return scoped2;
};
var suspend3 = (evaluate) => {
  const suspend6 = Object.create(proto5);
  suspend6._tag = OP_SUSPEND;
  suspend6.evaluate = evaluate;
  return suspend6;
};
var zipWithPar = /* @__PURE__ */ dual(3, (self, that, f) => suspend3(() => {
  const zipWithPar2 = Object.create(proto5);
  zipWithPar2._tag = OP_ZIP_WITH_PAR;
  zipWithPar2.first = self;
  zipWithPar2.second = that;
  zipWithPar2.zipK = f;
  return zipWithPar2;
}));
var provideLayer = /* @__PURE__ */ dual(2, (self, layer) => acquireUseRelease(scopeMake(), (scope3) => flatMap7(buildWithScope(layer, scope3), (context4) => provideContext(self, context4)), (scope3, exit3) => scopeClose(scope3, exit3)));
var provideSomeLayer = /* @__PURE__ */ dual(2, (self, layer) => provideLayer(self, merge6(context2(), layer)));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/layer/circular.mjs
var setConfigProvider = (configProvider) => scopedDiscard(withConfigProviderScoped(configProvider));
var setParentSpan = (span) => scopedDiscard(withParentSpanScoped(span));
var setSpan = (name, options) => scopedDiscard(withSpanScoped(name, options));
var setTracer = (tracer3) => scopedDiscard(withTracerScoped(tracer3));

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Fiber/Runtime/Flags.mjs
var diff10 = diff6;

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/internal/query.mjs
var currentCache = /* @__PURE__ */ fiberRefUnsafeMake(/* @__PURE__ */ unsafeMakeWith(65536, () => map9(deferredMake(), (handle) => ({
  listeners: new Listeners(),
  handle
})), () => seconds(60)));
var currentCacheEnabled = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentCacheEnabled"), () => fiberRefUnsafeMake(false));
var fromRequest = (request2, dataSource) => flatMap7(isEffect(dataSource) ? dataSource : succeed(dataSource), (ds) => fiberIdWith((id) => {
  const proxy = new Proxy(request2, {});
  return fiberRefGetWith(currentCacheEnabled, (cacheEnabled) => {
    if (cacheEnabled) {
      return fiberRefGetWith(currentCache, (cache) => flatMap7(cache.getEither(proxy), (orNew) => {
        switch (orNew._tag) {
          case "Left": {
            orNew.left.listeners.increment();
            return blocked(empty19, flatMap7(exit(deferredAwait(orNew.left.handle)), (exit3) => {
              if (exit3._tag === "Failure" && isInterruptedOnly(exit3.cause)) {
                orNew.left.listeners.decrement();
                return flatMap7(cache.invalidateWhen(proxy, (entry) => entry.handle === orNew.left.handle), () => fromRequest(proxy, dataSource));
              }
              return ensuring(deferredAwait(orNew.left.handle), sync(() => orNew.left.listeners.decrement()));
            }));
          }
          case "Right": {
            orNew.right.listeners.increment();
            return blocked(single(ds, makeEntry({
              request: proxy,
              result: orNew.right.handle,
              listeners: orNew.right.listeners,
              ownerId: id,
              state: {
                completed: false
              }
            })), uninterruptibleMask((restore) => flatMap7(exit(restore(deferredAwait(orNew.right.handle))), (exit3) => {
              orNew.right.listeners.decrement();
              return exit3;
            })));
          }
        }
      }));
    }
    const listeners = new Listeners();
    listeners.increment();
    return flatMap7(deferredMake(), (ref) => blocked(single(ds, makeEntry({
      request: proxy,
      result: ref,
      listeners,
      ownerId: id,
      state: {
        completed: false
      }
    })), ensuring(deferredAwait(ref), sync(() => listeners.decrement()))));
  });
}));
var cacheRequest = (request2, result) => {
  return fiberRefGetWith(currentCacheEnabled, (cacheEnabled) => {
    if (cacheEnabled) {
      return fiberRefGetWith(currentCache, (cache) => flatMap7(cache.getEither(request2), (orNew) => {
        switch (orNew._tag) {
          case "Left": {
            return unit;
          }
          case "Right": {
            return deferredComplete(orNew.right.handle, result);
          }
        }
      }));
    }
    return unit;
  });
};
var withRequestCaching = /* @__PURE__ */ dual(2, (self, strategy) => fiberRefLocally(self, currentCacheEnabled, strategy));
var withRequestCache = /* @__PURE__ */ dual(
  2,
  // @ts-expect-error
  (self, cache) => fiberRefLocally(self, currentCache, cache)
);

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Effect.mjs
var EffectTypeId3 = EffectTypeId2;
var isEffect2 = isEffect;
var cachedWithTTL = cached;
var cachedInvalidateWithTTL = cachedInvalidate;
var cached2 = memoize;
var cachedFunction = memoizeFunction;
var once2 = once;
var all5 = all4;
var allWith2 = allWith;
var allSuccesses2 = allSuccesses;
var dropUntil2 = dropUntil;
var dropWhile2 = dropWhile;
var every4 = every3;
var exists2 = exists;
var filter5 = filter4;
var findFirst5 = findFirst4;
var firstSuccessOf2 = firstSuccessOf;
var forEach4 = forEachOptions;
var head5 = head4;
var mergeAll2 = mergeAll;
var partition4 = partition3;
var reduce9 = reduce8;
var reduceEffect2 = reduceEffect;
var reduceRight3 = reduceRight2;
var reduceWhile2 = reduceWhile;
var replicate2 = replicate;
var replicateEffect2 = replicateEffect;
var takeUntil2 = takeUntil;
var takeWhile2 = takeWhile;
var validateAll2 = validateAll;
var validateFirst2 = validateFirst;
var async2 = async;
var asyncEffect2 = asyncEffect;
var asyncOption2 = asyncOption;
var asyncEither2 = asyncEither;
var fail4 = fail2;
var failSync2 = failSync;
var failCause2 = failCause;
var failCauseSync2 = failCauseSync;
var die3 = die2;
var dieMessage2 = dieMessage;
var dieSync2 = dieSync;
var gen2 = gen;
var never3 = never;
var none9 = none6;
var promise2 = promise;
var succeed4 = succeed;
var succeedNone2 = succeedNone;
var succeedSome2 = succeedSome;
var suspend4 = suspend;
var sync3 = sync;
var unit2 = unit;
var yieldNow3 = yieldNow;
var _catch2 = _catch;
var catchAll2 = catchAll;
var catchAllCause2 = catchAllCause;
var catchAllDefect2 = catchAllDefect;
var catchSome2 = catchSome;
var catchSomeCause2 = catchSomeCause;
var catchSomeDefect2 = catchSomeDefect;
var catchTag2 = catchTag;
var catchTags2 = catchTags;
var cause2 = cause;
var eventually2 = eventually;
var ignore2 = ignore;
var ignoreLogged2 = ignoreLogged;
var parallelErrors2 = parallelErrors;
var sandbox2 = sandbox;
var retry = retry_Effect;
var retryN = retryN_Effect;
var retryOrElse = retryOrElse_Effect;
var retryUntil = retryUntil_Effect;
var retryUntilEffect = retryUntilEffect_Effect;
var retryWhile = retryWhile_Effect;
var retryWhileEffect = retryWhileEffect_Effect;
var try_2 = try_;
var tryMap2 = tryMap;
var tryMapPromise2 = tryMapPromise;
var tryPromise2 = tryPromise;
var unsandbox2 = unsandbox;
var allowInterrupt2 = allowInterrupt;
var checkInterruptible2 = checkInterruptible;
var disconnect2 = disconnect;
var interrupt4 = interrupt2;
var interruptWith2 = interruptWith;
var interruptible3 = interruptible2;
var interruptibleMask2 = interruptibleMask;
var onInterrupt2 = onInterrupt;
var uninterruptible2 = uninterruptible;
var uninterruptibleMask2 = uninterruptibleMask;
var as3 = as2;
var asSome2 = asSome;
var asSomeError2 = asSomeError;
var asUnit2 = asUnit;
var flip2 = flip;
var flipWith2 = flipWith;
var map11 = map9;
var mapAccum3 = mapAccum2;
var mapBoth2 = mapBoth;
var mapError2 = mapError;
var mapErrorCause2 = mapErrorCause;
var merge7 = merge5;
var negate2 = negate;
var acquireRelease2 = acquireRelease;
var acquireReleaseInterruptible2 = acquireReleaseInterruptible;
var acquireUseRelease2 = acquireUseRelease;
var addFinalizer2 = addFinalizer;
var ensuring2 = ensuring;
var onError2 = onError;
var onExit2 = onExit;
var parallelFinalizers2 = parallelFinalizers;
var sequentialFinalizers2 = sequentialFinalizers;
var scope2 = scope;
var scopeWith2 = scopeWith;
var scoped = scopedEffect;
var using2 = using;
var withEarlyRelease2 = withEarlyRelease;
var awaitAllChildren2 = awaitAllChildren;
var daemonChildren2 = daemonChildren;
var descriptor2 = descriptor;
var descriptorWith2 = descriptorWith;
var diffFiberRefs2 = diffFiberRefs;
var ensuringChild2 = ensuringChild;
var ensuringChildren2 = ensuringChildren;
var fiberId2 = fiberId;
var fiberIdWith2 = fiberIdWith;
var fork2 = fork;
var forkDaemon2 = forkDaemon;
var forkAll2 = forkAll;
var forkIn2 = forkIn;
var forkScoped2 = forkScoped;
var forkWithErrorHandler2 = forkWithErrorHandler;
var fromFiber2 = fromFiber;
var fromFiberEffect2 = fromFiberEffect;
var supervised2 = supervised;
var transplant2 = transplant;
var withConcurrency2 = withConcurrency;
var setScheduler = (scheduler) => scopedDiscard(fiberRefLocallyScoped(currentScheduler, scheduler));
var withMaxFiberOps2 = withMaxFiberOps;
var withScheduler2 = withScheduler;
var withSchedulingPriority2 = withSchedulingPriority;
var clock2 = clock;
var clockWith4 = clockWith3;
var setClock = (clock3) => scopedDiscard(fiberRefLocallyScopedWith(currentServices, add2(clockTag, clock3)));
var withClockScoped2 = withClockScoped;
var withClock2 = withClock;
var delay2 = delay;
var sleep4 = sleep3;
var timed2 = timed;
var timedWith2 = timedWith;
var timeout2 = timeout;
var timeoutFail2 = timeoutFail;
var timeoutFailCause2 = timeoutFailCause;
var timeoutTo2 = timeoutTo;
var config2 = config;
var configProviderWith2 = configProviderWith;
var setConfigProvider2 = setConfigProvider;
var withConfigProvider2 = withConfigProvider;
var withConfigProviderScoped2 = withConfigProviderScoped;
var context3 = context;
var contextWith2 = contextWith;
var contextWithEffect2 = contextWithEffect;
var mapInputContext2 = mapInputContext;
var provideContext2 = provideContext;
var provideSomeContext2 = provideSomeContext;
var provideSomeRuntime = /* @__PURE__ */ dual(2, (self, runtime4) => {
  const patchFlags = diff10(defaultRuntime.runtimeFlags, runtime4.runtimeFlags);
  const inversePatchFlags = diff10(runtime4.runtimeFlags, defaultRuntime.runtimeFlags);
  const patchRefs = diff8(defaultRuntime.fiberRefs, runtime4.fiberRefs);
  const inversePatchRefs = diff8(runtime4.fiberRefs, defaultRuntime.fiberRefs);
  return acquireUseRelease2(flatMap7(updateRuntimeFlags2(patchFlags), () => patchFiberRefs2(patchRefs)), () => provideSomeContext2(self, runtime4.context), () => flatMap7(updateRuntimeFlags2(inversePatchFlags), () => patchFiberRefs2(inversePatchRefs)));
});
var provideLayer2 = provideLayer;
var provideService2 = provideService;
var provideServiceEffect2 = provideServiceEffect;
var provideSomeLayer2 = provideSomeLayer;
var serviceFunction2 = serviceFunction;
var serviceFunctionEffect2 = serviceFunctionEffect;
var serviceFunctions2 = serviceFunctions;
var serviceConstants2 = serviceConstants;
var serviceMembers2 = serviceMembers;
var serviceOption = (tag2) => contextWith2((_) => getOption2(_, tag2));
var updateService2 = updateService;
var Do2 = Do;
var bind2 = bind;
var bindTo2 = bindTo;
var let_ = bindValue;
var either3 = either2;
var exit2 = exit;
var intoDeferred2 = intoDeferred;
var option3 = option2;
var some5 = some4;
var unsome2 = unsome;
var if_2 = if_;
var filterOrDie2 = filterOrDie;
var filterOrDieMessage2 = filterOrDieMessage;
var filterOrElse2 = filterOrElse;
var filterOrFail2 = filterOrFail;
var unless2 = unless;
var unlessEffect2 = unlessEffect;
var when2 = when;
var whenEffect2 = whenEffect;
var whenFiberRef2 = whenFiberRef;
var whenRef2 = whenRef;
var flatMap9 = flatMap7;
var flatten7 = flatten5;
var raceAll2 = raceAll;
var race2 = race;
var raceFirst2 = raceFirst;
var raceWith2 = raceWith;
var summarized2 = summarized;
var tap2 = tap;
var tapBoth2 = tapBoth;
var tapDefect2 = tapDefect;
var tapError2 = tapError;
var tapErrorTag2 = tapErrorTag;
var tapErrorCause2 = tapErrorCause;
var forever2 = forever;
var iterate2 = iterate;
var loop2 = loop;
var repeat2 = repeat_Effect;
var repeatN2 = repeatN;
var repeatOrElse = repeatOrElse_Effect;
var repeatUntil = repeatUntil_Effect;
var repeatUntilEffect = repeatUntilEffect_Effect;
var repeatWhile = repeatWhile_Effect;
var repeatWhileEffect = repeatWhileEffect_Effect;
var schedule = schedule_Effect;
var scheduleForked2 = scheduleForked;
var scheduleFrom = scheduleFrom_Effect;
var whileLoop2 = whileLoop;
var getFiberRefs2 = getFiberRefs;
var inheritFiberRefs2 = inheritFiberRefs;
var locally = fiberRefLocally;
var locallyWith = fiberRefLocallyWith;
var locallyScoped = fiberRefLocallyScoped;
var locallyScopedWith = fiberRefLocallyScopedWith;
var patchFiberRefs2 = patchFiberRefs;
var setFiberRefs2 = setFiberRefs;
var updateFiberRefs2 = updateFiberRefs;
var isFailure3 = isFailure2;
var isSuccess2 = isSuccess;
var match6 = match4;
var matchCause2 = matchCause;
var matchCauseEffect2 = matchCauseEffect;
var matchEffect2 = matchEffect;
var log2 = log;
var logTrace2 = logTrace;
var logDebug2 = logDebug;
var logInfo2 = logInfo;
var logWarning2 = logWarning;
var logError2 = logError;
var logFatal2 = logFatal;
var withLogSpan2 = withLogSpan;
var annotateLogs2 = annotateLogs;
var logAnnotations2 = logAnnotations;
var withUnhandledErrorLogLevel2 = withUnhandledErrorLogLevel;
var setUnhandledErrorLogLevel = (level) => scopedDiscard(fiberRefLocallyScoped(currentUnhandledErrorLogLevel, level));
var orDie2 = orDie;
var orDieWith2 = orDieWith;
var orElse4 = orElse2;
var orElseFail2 = orElseFail;
var orElseSucceed2 = orElseSucceed;
var random3 = random2;
var randomWith2 = randomWith;
var runtime3 = runtime2;
var runtimeFlags2 = runtimeFlags;
var updateRuntimeFlags2 = updateRuntimeFlags;
var withRuntimeFlags2 = withRuntimeFlags;
var withRuntimeFlagsScoped2 = withRuntimeFlagsScoped;
var tagMetrics2 = tagMetrics;
var labelMetrics2 = labelMetrics;
var labelMetricsSet2 = labelMetricsSet;
var tagMetricsScoped2 = tagMetricsScoped;
var labelMetricsScoped2 = labelMetricsScoped;
var labelMetricsScopedSet2 = labelMetricsScopedSet;
var metricLabels2 = metricLabels;
var withMetric2 = withMetric;
var unifiedFn = unified;
var unified2 = identity;
var unsafeMakeSemaphore2 = unsafeMakeSemaphore;
var makeSemaphore2 = makeSemaphore;
var runFork = unsafeForkEffect;
var runCallback = unsafeRunEffect;
var runPromise = unsafeRunPromiseEffect;
var runPromiseExit = unsafeRunPromiseExitEffect;
var runSync = unsafeRunSyncEffect;
var runSyncExit = unsafeRunSyncExitEffect;
var validate3 = validate2;
var validateWith2 = validateWith;
var zip5 = zipOptions;
var zipLeft2 = zipLeftOptions;
var zipRight2 = zipRightOptions;
var zipWith4 = zipWithOptions;
var blocked2 = blocked;
var runRequestBlock2 = runRequestBlock;
var step3 = step2;
var flatMapStep2 = flatMapStep;
var request = fromRequest;
var cacheRequestResult = cacheRequest;
var withRequestBatching2 = withRequestBatching;
var setRequestBatching = (requestBatching) => scopedDiscard(fiberRefLocallyScoped(currentRequestBatching, requestBatching));
var setRequestCaching = (requestCaching) => scopedDiscard(fiberRefLocallyScoped(currentCacheEnabled, requestCaching));
var setRequestCache = (cache) => scopedDiscard(isEffect(cache) ? flatMap7(cache, (x) => fiberRefLocallyScoped(currentCache, x)) : fiberRefLocallyScoped(currentCache, cache));
var withRequestCaching2 = withRequestCaching;
var withRequestCache2 = withRequestCache;
var setTracer2 = setTracer;
var tracer2 = tracer;
var tracerWith4 = tracerWith;
var withTracer2 = withTracer;
var withTracerScoped2 = withTracerScoped;
var withTracerTiming2 = withTracerTiming;
var setTracerTiming = (enabled2) => scopedDiscard(fiberRefLocallyScoped(currentTracerTimingEnabled, enabled2));
var annotateSpans2 = annotateSpans;
var annotateCurrentSpan2 = annotateCurrentSpan;
var currentSpan2 = currentSpan;
var currentParentSpan2 = currentParentSpan;
var spanAnnotations2 = spanAnnotations;
var spanLinks2 = spanLinks;
var linkSpans2 = linkSpans;
var makeSpan2 = makeSpan;
var setParentSpan2 = setParentSpan;
var setSpan2 = setSpan;
var useSpan2 = useSpan;
var useSpanScoped2 = useSpanScoped;
var withSpan2 = withSpan;
var withSpanScoped2 = withSpanScoped;
var withParentSpan2 = withParentSpan;
var withParentSpanScoped2 = withParentSpanScoped;
var fromNullable3 = fromNullable2;
var optionFromOptional2 = optionFromOptional;

// node_modules/.pnpm/effect@2.0.0-next.28_@effect+data@0.17.6_@effect+io@0.38.2_@effect+match@0.34.0_@effect+stm@0.22.0_@effect+stream@0.34.0/node_modules/effect/mjs/Config.mjs
var Config_exports = {};
__export(Config_exports, {
  ConfigTypeId: () => ConfigTypeId2,
  all: () => all6,
  array: () => array5,
  boolean: () => boolean2,
  chunk: () => chunk3,
  date: () => date2,
  fail: () => fail5,
  hashMap: () => hashMap3,
  hashSet: () => hashSet4,
  integer: () => integer2,
  isConfig: () => isConfig2,
  logLevel: () => logLevel2,
  map: () => map12,
  mapAttempt: () => mapAttempt2,
  mapOrFail: () => mapOrFail2,
  nested: () => nested3,
  number: () => number4,
  option: () => option4,
  orElse: () => orElse5,
  orElseIf: () => orElseIf2,
  primitive: () => primitive2,
  repeat: () => repeat3,
  secret: () => secret2,
  string: () => string3,
  succeed: () => succeed5,
  suspend: () => suspend5,
  sync: () => sync4,
  unwrap: () => unwrap2,
  validate: () => validate4,
  withDefault: () => withDefault2,
  withDescription: () => withDescription2,
  zip: () => zip6,
  zipWith: () => zipWith5
});

// node_modules/.pnpm/@effect+io@0.38.2_@effect+data@0.17.6/node_modules/@effect/io/mjs/Config.mjs
var ConfigTypeId2 = ConfigTypeId;
var all6 = all2;
var array5 = array4;
var boolean2 = boolean;
var chunk3 = chunk2;
var date2 = date;
var fail5 = fail3;
var number4 = number3;
var integer2 = integer;
var logLevel2 = logLevel;
var isConfig2 = isConfig;
var map12 = map10;
var mapAttempt2 = mapAttempt;
var mapOrFail2 = mapOrFail;
var nested3 = nested;
var orElse5 = orElse3;
var orElseIf2 = orElseIf;
var option4 = option;
var primitive2 = primitive;
var repeat3 = repeat;
var secret2 = secret;
var hashSet4 = hashSet3;
var string3 = string2;
var succeed5 = succeed3;
var suspend5 = suspend2;
var sync4 = sync2;
var hashMap3 = hashMap2;
var unwrap2 = unwrap;
var validate4 = validate;
var withDefault2 = withDefault;
var withDescription2 = withDescription;
var zip6 = zip4;
var zipWith5 = zipWith3;

// node_modules/.pnpm/effect@2.0.0-next.28_@effect+data@0.17.6_@effect+io@0.38.2_@effect+match@0.34.0_@effect+stm@0.22.0_@effect+stream@0.34.0/node_modules/effect/mjs/Data.mjs
var Data_exports2 = {};
__export(Data_exports2, {
  Class: () => Class,
  TaggedClass: () => TaggedClass,
  array: () => array3,
  case: () => _case,
  struct: () => struct,
  tagged: () => tagged,
  taggedEnum: () => taggedEnum,
  tuple: () => tuple2,
  unsafeArray: () => unsafeArray,
  unsafeStruct: () => unsafeStruct
});

// node_modules/.pnpm/effect@2.0.0-next.28_@effect+data@0.17.6_@effect+io@0.38.2_@effect+match@0.34.0_@effect+stm@0.22.0_@effect+stream@0.34.0/node_modules/effect/mjs/Effect.mjs
var Effect_exports = {};
__export(Effect_exports, {
  Do: () => Do2,
  EffectTypeId: () => EffectTypeId3,
  acquireRelease: () => acquireRelease2,
  acquireReleaseInterruptible: () => acquireReleaseInterruptible2,
  acquireUseRelease: () => acquireUseRelease2,
  addFinalizer: () => addFinalizer2,
  all: () => all5,
  allSuccesses: () => allSuccesses2,
  allWith: () => allWith2,
  allowInterrupt: () => allowInterrupt2,
  annotateCurrentSpan: () => annotateCurrentSpan2,
  annotateLogs: () => annotateLogs2,
  annotateSpans: () => annotateSpans2,
  as: () => as3,
  asSome: () => asSome2,
  asSomeError: () => asSomeError2,
  asUnit: () => asUnit2,
  async: () => async2,
  asyncEffect: () => asyncEffect2,
  asyncEither: () => asyncEither2,
  asyncOption: () => asyncOption2,
  awaitAllChildren: () => awaitAllChildren2,
  bind: () => bind2,
  bindTo: () => bindTo2,
  blocked: () => blocked2,
  cacheRequestResult: () => cacheRequestResult,
  cached: () => cached2,
  cachedFunction: () => cachedFunction,
  cachedInvalidateWithTTL: () => cachedInvalidateWithTTL,
  cachedWithTTL: () => cachedWithTTL,
  catch: () => _catch2,
  catchAll: () => catchAll2,
  catchAllCause: () => catchAllCause2,
  catchAllDefect: () => catchAllDefect2,
  catchSome: () => catchSome2,
  catchSomeCause: () => catchSomeCause2,
  catchSomeDefect: () => catchSomeDefect2,
  catchTag: () => catchTag2,
  catchTags: () => catchTags2,
  cause: () => cause2,
  checkInterruptible: () => checkInterruptible2,
  clock: () => clock2,
  clockWith: () => clockWith4,
  config: () => config2,
  configProviderWith: () => configProviderWith2,
  context: () => context3,
  contextWith: () => contextWith2,
  contextWithEffect: () => contextWithEffect2,
  currentParentSpan: () => currentParentSpan2,
  currentSpan: () => currentSpan2,
  daemonChildren: () => daemonChildren2,
  delay: () => delay2,
  descriptor: () => descriptor2,
  descriptorWith: () => descriptorWith2,
  die: () => die3,
  dieMessage: () => dieMessage2,
  dieSync: () => dieSync2,
  diffFiberRefs: () => diffFiberRefs2,
  disconnect: () => disconnect2,
  dropUntil: () => dropUntil2,
  dropWhile: () => dropWhile2,
  either: () => either3,
  ensuring: () => ensuring2,
  ensuringChild: () => ensuringChild2,
  ensuringChildren: () => ensuringChildren2,
  eventually: () => eventually2,
  every: () => every4,
  exists: () => exists2,
  exit: () => exit2,
  fail: () => fail4,
  failCause: () => failCause2,
  failCauseSync: () => failCauseSync2,
  failSync: () => failSync2,
  fiberId: () => fiberId2,
  fiberIdWith: () => fiberIdWith2,
  filter: () => filter5,
  filterOrDie: () => filterOrDie2,
  filterOrDieMessage: () => filterOrDieMessage2,
  filterOrElse: () => filterOrElse2,
  filterOrFail: () => filterOrFail2,
  findFirst: () => findFirst5,
  firstSuccessOf: () => firstSuccessOf2,
  flatMap: () => flatMap9,
  flatMapStep: () => flatMapStep2,
  flatten: () => flatten7,
  flip: () => flip2,
  flipWith: () => flipWith2,
  forEach: () => forEach4,
  forever: () => forever2,
  fork: () => fork2,
  forkAll: () => forkAll2,
  forkDaemon: () => forkDaemon2,
  forkIn: () => forkIn2,
  forkScoped: () => forkScoped2,
  forkWithErrorHandler: () => forkWithErrorHandler2,
  fromFiber: () => fromFiber2,
  fromFiberEffect: () => fromFiberEffect2,
  fromNullable: () => fromNullable3,
  gen: () => gen2,
  getFiberRefs: () => getFiberRefs2,
  head: () => head5,
  if: () => if_2,
  ignore: () => ignore2,
  ignoreLogged: () => ignoreLogged2,
  inheritFiberRefs: () => inheritFiberRefs2,
  interrupt: () => interrupt4,
  interruptWith: () => interruptWith2,
  interruptible: () => interruptible3,
  interruptibleMask: () => interruptibleMask2,
  intoDeferred: () => intoDeferred2,
  isEffect: () => isEffect2,
  isFailure: () => isFailure3,
  isSuccess: () => isSuccess2,
  iterate: () => iterate2,
  labelMetrics: () => labelMetrics2,
  labelMetricsScoped: () => labelMetricsScoped2,
  labelMetricsScopedSet: () => labelMetricsScopedSet2,
  labelMetricsSet: () => labelMetricsSet2,
  let: () => let_,
  linkSpans: () => linkSpans2,
  locally: () => locally,
  locallyScoped: () => locallyScoped,
  locallyScopedWith: () => locallyScopedWith,
  locallyWith: () => locallyWith,
  log: () => log2,
  logAnnotations: () => logAnnotations2,
  logDebug: () => logDebug2,
  logError: () => logError2,
  logFatal: () => logFatal2,
  logInfo: () => logInfo2,
  logTrace: () => logTrace2,
  logWarning: () => logWarning2,
  loop: () => loop2,
  makeSemaphore: () => makeSemaphore2,
  makeSpan: () => makeSpan2,
  map: () => map11,
  mapAccum: () => mapAccum3,
  mapBoth: () => mapBoth2,
  mapError: () => mapError2,
  mapErrorCause: () => mapErrorCause2,
  mapInputContext: () => mapInputContext2,
  match: () => match6,
  matchCause: () => matchCause2,
  matchCauseEffect: () => matchCauseEffect2,
  matchEffect: () => matchEffect2,
  merge: () => merge7,
  mergeAll: () => mergeAll2,
  metricLabels: () => metricLabels2,
  negate: () => negate2,
  never: () => never3,
  none: () => none9,
  onError: () => onError2,
  onExit: () => onExit2,
  onInterrupt: () => onInterrupt2,
  once: () => once2,
  option: () => option3,
  optionFromOptional: () => optionFromOptional2,
  orDie: () => orDie2,
  orDieWith: () => orDieWith2,
  orElse: () => orElse4,
  orElseFail: () => orElseFail2,
  orElseSucceed: () => orElseSucceed2,
  parallelErrors: () => parallelErrors2,
  parallelFinalizers: () => parallelFinalizers2,
  partition: () => partition4,
  patchFiberRefs: () => patchFiberRefs2,
  promise: () => promise2,
  provideContext: () => provideContext2,
  provideLayer: () => provideLayer2,
  provideService: () => provideService2,
  provideServiceEffect: () => provideServiceEffect2,
  provideSomeContext: () => provideSomeContext2,
  provideSomeLayer: () => provideSomeLayer2,
  provideSomeRuntime: () => provideSomeRuntime,
  race: () => race2,
  raceAll: () => raceAll2,
  raceFirst: () => raceFirst2,
  raceWith: () => raceWith2,
  random: () => random3,
  randomWith: () => randomWith2,
  reduce: () => reduce9,
  reduceEffect: () => reduceEffect2,
  reduceRight: () => reduceRight3,
  reduceWhile: () => reduceWhile2,
  repeat: () => repeat2,
  repeatN: () => repeatN2,
  repeatOrElse: () => repeatOrElse,
  repeatUntil: () => repeatUntil,
  repeatUntilEffect: () => repeatUntilEffect,
  repeatWhile: () => repeatWhile,
  repeatWhileEffect: () => repeatWhileEffect,
  replicate: () => replicate2,
  replicateEffect: () => replicateEffect2,
  request: () => request,
  retry: () => retry,
  retryN: () => retryN,
  retryOrElse: () => retryOrElse,
  retryUntil: () => retryUntil,
  retryUntilEffect: () => retryUntilEffect,
  retryWhile: () => retryWhile,
  retryWhileEffect: () => retryWhileEffect,
  runCallback: () => runCallback,
  runFork: () => runFork,
  runPromise: () => runPromise,
  runPromiseExit: () => runPromiseExit,
  runRequestBlock: () => runRequestBlock2,
  runSync: () => runSync,
  runSyncExit: () => runSyncExit,
  runtime: () => runtime3,
  runtimeFlags: () => runtimeFlags2,
  sandbox: () => sandbox2,
  schedule: () => schedule,
  scheduleForked: () => scheduleForked2,
  scheduleFrom: () => scheduleFrom,
  scope: () => scope2,
  scopeWith: () => scopeWith2,
  scoped: () => scoped,
  sequentialFinalizers: () => sequentialFinalizers2,
  serviceConstants: () => serviceConstants2,
  serviceFunction: () => serviceFunction2,
  serviceFunctionEffect: () => serviceFunctionEffect2,
  serviceFunctions: () => serviceFunctions2,
  serviceMembers: () => serviceMembers2,
  serviceOption: () => serviceOption,
  setClock: () => setClock,
  setConfigProvider: () => setConfigProvider2,
  setFiberRefs: () => setFiberRefs2,
  setParentSpan: () => setParentSpan2,
  setRequestBatching: () => setRequestBatching,
  setRequestCache: () => setRequestCache,
  setRequestCaching: () => setRequestCaching,
  setScheduler: () => setScheduler,
  setSpan: () => setSpan2,
  setTracer: () => setTracer2,
  setTracerTiming: () => setTracerTiming,
  setUnhandledErrorLogLevel: () => setUnhandledErrorLogLevel,
  sleep: () => sleep4,
  some: () => some5,
  spanAnnotations: () => spanAnnotations2,
  spanLinks: () => spanLinks2,
  step: () => step3,
  succeed: () => succeed4,
  succeedNone: () => succeedNone2,
  succeedSome: () => succeedSome2,
  summarized: () => summarized2,
  supervised: () => supervised2,
  suspend: () => suspend4,
  sync: () => sync3,
  tagMetrics: () => tagMetrics2,
  tagMetricsScoped: () => tagMetricsScoped2,
  takeUntil: () => takeUntil2,
  takeWhile: () => takeWhile2,
  tap: () => tap2,
  tapBoth: () => tapBoth2,
  tapDefect: () => tapDefect2,
  tapError: () => tapError2,
  tapErrorCause: () => tapErrorCause2,
  tapErrorTag: () => tapErrorTag2,
  timed: () => timed2,
  timedWith: () => timedWith2,
  timeout: () => timeout2,
  timeoutFail: () => timeoutFail2,
  timeoutFailCause: () => timeoutFailCause2,
  timeoutTo: () => timeoutTo2,
  tracer: () => tracer2,
  tracerWith: () => tracerWith4,
  transplant: () => transplant2,
  try: () => try_2,
  tryMap: () => tryMap2,
  tryMapPromise: () => tryMapPromise2,
  tryPromise: () => tryPromise2,
  unified: () => unified2,
  unifiedFn: () => unifiedFn,
  uninterruptible: () => uninterruptible2,
  uninterruptibleMask: () => uninterruptibleMask2,
  unit: () => unit2,
  unless: () => unless2,
  unlessEffect: () => unlessEffect2,
  unsafeMakeSemaphore: () => unsafeMakeSemaphore2,
  unsandbox: () => unsandbox2,
  unsome: () => unsome2,
  updateFiberRefs: () => updateFiberRefs2,
  updateRuntimeFlags: () => updateRuntimeFlags2,
  updateService: () => updateService2,
  useSpan: () => useSpan2,
  useSpanScoped: () => useSpanScoped2,
  using: () => using2,
  validate: () => validate3,
  validateAll: () => validateAll2,
  validateFirst: () => validateFirst2,
  validateWith: () => validateWith2,
  when: () => when2,
  whenEffect: () => whenEffect2,
  whenFiberRef: () => whenFiberRef2,
  whenRef: () => whenRef2,
  whileLoop: () => whileLoop2,
  withClock: () => withClock2,
  withClockScoped: () => withClockScoped2,
  withConcurrency: () => withConcurrency2,
  withConfigProvider: () => withConfigProvider2,
  withConfigProviderScoped: () => withConfigProviderScoped2,
  withEarlyRelease: () => withEarlyRelease2,
  withLogSpan: () => withLogSpan2,
  withMaxFiberOps: () => withMaxFiberOps2,
  withMetric: () => withMetric2,
  withParentSpan: () => withParentSpan2,
  withParentSpanScoped: () => withParentSpanScoped2,
  withRequestBatching: () => withRequestBatching2,
  withRequestCache: () => withRequestCache2,
  withRequestCaching: () => withRequestCaching2,
  withRuntimeFlags: () => withRuntimeFlags2,
  withRuntimeFlagsScoped: () => withRuntimeFlagsScoped2,
  withScheduler: () => withScheduler2,
  withSchedulingPriority: () => withSchedulingPriority2,
  withSpan: () => withSpan2,
  withSpanScoped: () => withSpanScoped2,
  withTracer: () => withTracer2,
  withTracerScoped: () => withTracerScoped2,
  withTracerTiming: () => withTracerTiming2,
  withUnhandledErrorLogLevel: () => withUnhandledErrorLogLevel2,
  yieldNow: () => yieldNow3,
  zip: () => zip5,
  zipLeft: () => zipLeft2,
  zipRight: () => zipRight2,
  zipWith: () => zipWith4
});

// node_modules/.pnpm/effect@2.0.0-next.28_@effect+data@0.17.6_@effect+io@0.38.2_@effect+match@0.34.0_@effect+stm@0.22.0_@effect+stream@0.34.0/node_modules/effect/mjs/Match.mjs
var Match_exports = {};
__export(Match_exports, {
  SafeRefinementId: () => SafeRefinementId,
  any: () => any,
  bigint: () => bigint,
  boolean: () => boolean3,
  date: () => date3,
  defined: () => defined,
  discriminator: () => discriminator,
  discriminators: () => discriminators,
  discriminatorsExhaustive: () => discriminatorsExhaustive,
  either: () => either4,
  exhaustive: () => exhaustive,
  instanceOf: () => instanceOf,
  instanceOfUnsafe: () => instanceOfUnsafe,
  is: () => is,
  nonEmptyString: () => nonEmptyString,
  not: () => not2,
  null: () => _null,
  number: () => number5,
  option: () => option5,
  orElse: () => orElse6,
  orElseAbsurd: () => orElseAbsurd,
  record: () => record,
  string: () => string4,
  tag: () => tag,
  tags: () => tags,
  tagsExhaustive: () => tagsExhaustive,
  type: () => type,
  typeTags: () => typeTags,
  undefined: () => _undefined,
  value: () => value,
  valueTags: () => valueTags,
  when: () => when3,
  whenAnd: () => whenAnd,
  whenOr: () => whenOr
});

// node_modules/.pnpm/@effect+match@0.34.0_@effect+data@0.17.6/node_modules/@effect/match/mjs/index.mjs
var TypeMatcherImpl = class _TypeMatcherImpl {
  constructor(cases) {
    this.cases = cases;
    this._tag = "TypeMatcher";
    this._input = identity;
    this._filters = identity;
    this._remaining = identity;
    this._result = identity;
  }
  add(_case2) {
    return new _TypeMatcherImpl([...this.cases, _case2]);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var ValueMatcherImpl = class _ValueMatcherImpl {
  constructor(provided, value2) {
    this.provided = provided;
    this.value = value2;
    this._tag = "ValueMatcher";
    this._input = identity;
    this._filters = identity;
    this._result = identity;
  }
  add(_case2) {
    if (this.value._tag === "Right") {
      return this;
    }
    if (_case2._tag === "When" && _case2.guard(this.provided) === true) {
      return new _ValueMatcherImpl(this.provided, right2(_case2.evaluate(this.provided)));
    } else if (_case2._tag === "Not" && _case2.guard(this.provided) === false) {
      return new _ValueMatcherImpl(this.provided, right2(_case2.evaluate(this.provided)));
    }
    return this;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var When = class {
  constructor(guard, evaluate) {
    this.guard = guard;
    this.evaluate = evaluate;
    this._tag = "When";
  }
};
var Not = class {
  constructor(guard, evaluate) {
    this.guard = guard;
    this.evaluate = evaluate;
    this._tag = "Not";
  }
};
var makePredicate = (pattern) => {
  if (typeof pattern === "function") {
    return pattern;
  } else if (Array.isArray(pattern)) {
    const predicates = pattern.map(makePredicate);
    const len = predicates.length;
    return (u) => {
      if (!Array.isArray(u)) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (predicates[i](u[i]) === false) {
          return false;
        }
      }
      return true;
    };
  } else if (pattern !== null && typeof pattern === "object") {
    const keysAndPredicates = Object.entries(pattern).map(([k, p]) => [k, makePredicate(p)]);
    const len = keysAndPredicates.length;
    return (u) => {
      if (typeof u !== "object" || u === null) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        const [key2, predicate] = keysAndPredicates[i];
        if (!(key2 in u) || predicate(u[key2]) === false) {
          return false;
        }
      }
      return true;
    };
  }
  return (u) => u === pattern;
};
var makeOrPredicate = (patterns) => {
  const predicates = patterns.map(makePredicate);
  const len = predicates.length;
  return (u) => {
    for (let i = 0; i < len; i++) {
      if (predicates[i](u) === true) {
        return true;
      }
    }
    return false;
  };
};
var makeAndPredicate = (patterns) => {
  const predicates = patterns.map(makePredicate);
  const len = predicates.length;
  return (u) => {
    for (let i = 0; i < len; i++) {
      if (predicates[i](u) === false) {
        return false;
      }
    }
    return true;
  };
};
var type = () => new TypeMatcherImpl([]);
var value = (i) => new ValueMatcherImpl(i, left2(i));
var valueTags = (fields) => {
  const match7 = tagsExhaustive(fields)(new TypeMatcherImpl([]));
  return (input) => match7(input);
};
var typeTags = () => (fields) => {
  const match7 = tagsExhaustive(fields)(new TypeMatcherImpl([]));
  return (input) => match7(input);
};
var when3 = (pattern, f) => (self) => self.add(new When(makePredicate(pattern), f));
var whenOr = (...args) => (self) => {
  const onMatch = args[args.length - 1];
  const patterns = args.slice(0, -1);
  return self.add(new When(makeOrPredicate(patterns), onMatch));
};
var whenAnd = (...args) => (self) => {
  const onMatch = args[args.length - 1];
  const patterns = args.slice(0, -1);
  return self.add(new When(makeAndPredicate(patterns), onMatch));
};
var discriminator = (field) => (...pattern) => {
  const f = pattern[pattern.length - 1];
  const values3 = pattern.slice(0, -1);
  const pred = values3.length === 1 ? (_) => _[field] === values3[0] : (_) => values3.includes(_[field]);
  return (self) => self.add(new When(pred, f));
};
var discriminators = (field) => (fields) => {
  const predicates = [];
  for (const key2 in fields) {
    const pred = (_) => _[field] === key2;
    const f = fields[key2];
    if (f) {
      predicates.push(new When(pred, f));
    }
  }
  const len = predicates.length;
  return (self) => {
    let matcher = self;
    for (let i = 0; i < len; i++) {
      matcher = matcher.add(predicates[i]);
    }
    return matcher;
  };
};
var discriminatorsExhaustive = (field) => (fields) => {
  const addCases = discriminators(field)(fields);
  return (matcher) => exhaustive(addCases(matcher));
};
var tag = /* @__PURE__ */ discriminator("_tag");
var tags = /* @__PURE__ */ discriminators("_tag");
var tagsExhaustive = /* @__PURE__ */ discriminatorsExhaustive("_tag");
var not2 = (pattern, f) => (self) => self.add(new Not(makePredicate(pattern), f));
var SafeRefinementId = /* @__PURE__ */ Symbol.for("@effect/match/SafeRefinementId");
var nonEmptyString = (u) => typeof u === "string" && u.length > 0;
var is = (...literals) => {
  const len = literals.length;
  return (u) => {
    for (let i = 0; i < len; i++) {
      if (u === literals[i]) {
        return true;
      }
    }
    return false;
  };
};
var string4 = isString;
var number5 = isNumber;
var any = () => true;
var defined = (u) => u !== void 0 && u !== null;
var boolean3 = isBoolean;
var _undefined = isUndefined;
var _null = isNull;
var bigint = isBigint;
var date3 = isDate;
var record = isRecord;
var instanceOf = (constructor) => (u) => u instanceof constructor;
var instanceOfUnsafe = instanceOf;
var orElse6 = (f) => (self) => {
  const result = either4(self);
  if (isEither2(result)) {
    return result._tag === "Right" ? result.right : f(result.left);
  }
  return (input) => {
    const a = result(input);
    return a._tag === "Right" ? a.right : f(a.left);
  };
};
var orElseAbsurd = (self) => orElse6(() => {
  throw new Error("absurd");
})(self);
var either4 = (self) => {
  if (self._tag === "ValueMatcher") {
    return self.value;
  }
  const len = self.cases.length;
  return (input) => {
    for (let i = 0; i < len; i++) {
      const _case2 = self.cases[i];
      if (_case2._tag === "When" && _case2.guard(input) === true) {
        return right2(_case2.evaluate(input));
      } else if (_case2._tag === "Not" && _case2.guard(input) === false) {
        return right2(_case2.evaluate(input));
      }
    }
    return left2(input);
  };
};
var option5 = (self) => {
  const toEither = either4(self);
  if (isEither2(toEither)) {
    return match(toEither, {
      onLeft: () => none2(),
      onRight: some2
    });
  }
  return (input) => match(toEither(input), {
    onLeft: () => none2(),
    onRight: (_) => some2(_)
  });
};
var exhaustive = (self) => {
  const toEither = either4(self);
  if (isEither2(toEither)) {
    if (toEither._tag === "Right") {
      return toEither.right;
    }
    throw new Error("@effect/match: exhaustive absurd");
  }
  return (u) => {
    const result = toEither(u);
    if (result._tag === "Right") {
      return result.right;
    }
    throw new Error("@effect/match: exhaustive absurd");
  };
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/internal/common.mjs
var ArbitraryHookId = "@effect/schema/ArbitraryHookId";
var PrettyHookId = "@effect/schema/PrettyHookId";
var getKeysForIndexSignature = (input, parameter) => {
  switch (parameter._tag) {
    case "StringKeyword":
    case "TemplateLiteral":
      return Object.keys(input);
    case "SymbolKeyword":
      return Object.getOwnPropertySymbols(input);
    case "Refinement":
      return getKeysForIndexSignature(input, parameter.from);
  }
};
var ownKeys = (o) => Object.keys(o).concat(Object.getOwnPropertySymbols(o));
var memoizeThunk = (f) => {
  let done7 = false;
  let a;
  return () => {
    if (done7) {
      return a;
    }
    a = f();
    done7 = true;
    return a;
  };
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/ParseResult.mjs
var parseError = (errors) => ({
  _tag: "ParseError",
  errors
});
var type2 = (expected, actual, message) => ({
  _tag: "Type",
  expected,
  actual,
  message: fromNullable(message)
});
var forbidden = {
  _tag: "Forbidden"
};
var index = (index2, errors) => ({
  _tag: "Index",
  index: index2,
  errors
});
var key = (key2, errors) => ({
  _tag: "Key",
  key: key2,
  errors
});
var missing = {
  _tag: "Missing"
};
var unexpected = (actual) => ({
  _tag: "Unexpected",
  actual
});
var unionMember = (errors) => ({
  _tag: "UnionMember",
  errors
});
var success = right2;
var failure = (e) => left2(parseError([e]));
var failures2 = (es) => left2(parseError(es));
var eitherOrUndefined = (self) => {
  const s = self;
  if (s["_tag"] === "Left" || s["_tag"] === "Right") {
    return s;
  }
};
var flatMap10 = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return f(s.right);
  }
  return flatMap9(self, f);
};
var map13 = (self, f) => {
  const s = self;
  if (s["_tag"] === "Left") {
    return s;
  }
  if (s["_tag"] === "Right") {
    return right2(f(s.right));
  }
  return map11(self, f);
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/AST.mjs
var TypeAnnotationId = "@effect/schema/TypeAnnotationId";
var MessageAnnotationId = "@effect/schema/MessageAnnotationId";
var IdentifierAnnotationId = "@effect/schema/IdentifierAnnotationId";
var TitleAnnotationId = "@effect/schema/TitleAnnotationId";
var DescriptionAnnotationId = "@effect/schema/DescriptionAnnotationId";
var ExamplesAnnotationId = "@effect/schema/ExamplesAnnotationId";
var JSONSchemaAnnotationId = "@effect/schema/JSONSchemaAnnotationId";
var DocumentationAnnotationId = "@effect/schema/DocumentationAnnotationId";
var getAnnotation = (key2) => (annotated2) => Object.prototype.hasOwnProperty.call(annotated2.annotations, key2) ? some2(annotated2.annotations[key2]) : none2();
var createDeclaration = (typeParameters, type3, decode3, annotations = {}) => ({
  _tag: "Declaration",
  typeParameters,
  type: type3,
  decode: decode3,
  annotations
});
var createLiteral = (literal2) => ({
  _tag: "Literal",
  literal: literal2,
  annotations: {}
});
var isLiteral = (ast) => ast._tag === "Literal";
var isUniqueSymbol = (ast) => ast._tag === "UniqueSymbol";
var undefinedKeyword = {
  _tag: "UndefinedKeyword",
  annotations: {
    [TitleAnnotationId]: "undefined"
  }
};
var voidKeyword = {
  _tag: "VoidKeyword",
  annotations: {
    [TitleAnnotationId]: "void"
  }
};
var neverKeyword = {
  _tag: "NeverKeyword",
  annotations: {
    [TitleAnnotationId]: "never"
  }
};
var unknownKeyword = {
  _tag: "UnknownKeyword",
  annotations: {
    [TitleAnnotationId]: "unknown"
  }
};
var isUnknownKeyword = (ast) => ast._tag === "UnknownKeyword";
var anyKeyword = {
  _tag: "AnyKeyword",
  annotations: {
    [TitleAnnotationId]: "any"
  }
};
var isAnyKeyword = (ast) => ast._tag === "AnyKeyword";
var stringKeyword = {
  _tag: "StringKeyword",
  annotations: {
    [TitleAnnotationId]: "string"
  }
};
var isStringKeyword = (ast) => ast._tag === "StringKeyword";
var numberKeyword = {
  _tag: "NumberKeyword",
  annotations: {
    [TitleAnnotationId]: "number"
  }
};
var isNumberKeyword = (ast) => ast._tag === "NumberKeyword";
var booleanKeyword = {
  _tag: "BooleanKeyword",
  annotations: {
    [TitleAnnotationId]: "boolean"
  }
};
var isBooleanKeyword = (ast) => ast._tag === "BooleanKeyword";
var bigIntKeyword = {
  _tag: "BigIntKeyword",
  annotations: {
    [TitleAnnotationId]: "bigint"
  }
};
var isBigIntKeyword = (ast) => ast._tag === "BigIntKeyword";
var symbolKeyword = {
  _tag: "SymbolKeyword",
  annotations: {
    [TitleAnnotationId]: "symbol"
  }
};
var isSymbolKeyword = (ast) => ast._tag === "SymbolKeyword";
var objectKeyword = {
  _tag: "ObjectKeyword",
  annotations: {
    [TitleAnnotationId]: "object"
  }
};
var createElement = (type3, isOptional) => ({
  type: type3,
  isOptional
});
var createTuple = (elements, rest, isReadonly, annotations = {}) => ({
  _tag: "Tuple",
  elements,
  rest,
  isReadonly,
  annotations
});
var createPropertySignature = (name, type3, isOptional, isReadonly, annotations = {}) => ({
  name,
  type: type3,
  isOptional,
  isReadonly,
  annotations
});
var isParameter = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return true;
    case "Refinement":
      return isParameter(ast.from);
    default:
      return false;
  }
};
var createIndexSignature = (parameter, type3, isReadonly) => {
  if (isParameter(parameter)) {
    return {
      parameter,
      type: type3,
      isReadonly
    };
  }
  throw new Error("An index signature parameter type must be 'string', 'symbol', a template literal type or a refinement of the previous types");
};
var createTypeLiteral = (propertySignatures, indexSignatures, annotations = {}) => {
  const keys3 = {};
  for (let i = 0; i < propertySignatures.length; i++) {
    const name = propertySignatures[i].name;
    if (Object.prototype.hasOwnProperty.call(keys3, name)) {
      throw new Error(`Duplicate property signature ${String(name)}`);
    }
    keys3[name] = null;
  }
  const parameters = {
    string: false,
    symbol: false
  };
  for (let i = 0; i < indexSignatures.length; i++) {
    const parameter = getParameterBase(indexSignatures[i].parameter);
    if (isStringKeyword(parameter)) {
      if (parameters.string) {
        throw new Error("Duplicate index signature for type `string`");
      }
      parameters.string = true;
    } else if (isSymbolKeyword(parameter)) {
      if (parameters.symbol) {
        throw new Error("Duplicate index signature for type `symbol`");
      }
      parameters.symbol = true;
    }
  }
  return {
    _tag: "TypeLiteral",
    propertySignatures: sortPropertySignatures(propertySignatures),
    indexSignatures,
    annotations
  };
};
var createUnion = (candidates, annotations = {}) => {
  const types = unify(candidates);
  switch (types.length) {
    case 0:
      return neverKeyword;
    case 1:
      return types[0];
    default: {
      return {
        _tag: "Union",
        types: sortUnionMembers(types),
        annotations
      };
    }
  }
};
var createLazy = (f, annotations = {}) => ({
  _tag: "Lazy",
  f: memoizeThunk(f),
  annotations
});
var createRefinement = (from2, decode3, isReversed, annotations = {}) => ({
  _tag: "Refinement",
  from: from2,
  decode: decode3,
  isReversed,
  annotations
});
var isRefinement = (ast) => ast._tag === "Refinement";
var createPropertySignatureTransformation = (from2, to2, decode3, encode2) => ({
  from: from2,
  to: to2,
  decode: decode3,
  encode: encode2
});
var _createTransform = (from2, to2, decode3, encode2, propertySignatureTransformations, annotations = {}) => ({
  _tag: "Transform",
  from: from2,
  to: to2,
  decode: decode3,
  encode: encode2,
  propertySignatureTransformations,
  annotations
});
var createTransform = (from2, to2, decode3, encode2, annotations = {}) => _createTransform(from2, to2, decode3, encode2, [], annotations);
var createTransformByPropertySignatureTransformations = (from2, to2, propertySignatureTransformations, annotations = {}) => _createTransform(from2, to2, (input) => {
  for (let i = 0; i < propertySignatureTransformations.length; i++) {
    const t = propertySignatureTransformations[i];
    const name = t.from;
    const from3 = Object.prototype.hasOwnProperty.call(input, name) ? some2(input[name]) : none2();
    delete input[name];
    const to3 = t.decode(from3);
    if (isSome2(to3)) {
      input[t.to] = to3.value;
    }
  }
  return success(input);
}, (input) => {
  for (let i = 0; i < propertySignatureTransformations.length; i++) {
    const t = propertySignatureTransformations[i];
    const name = t.to;
    const from3 = Object.prototype.hasOwnProperty.call(input, name) ? some2(input[name]) : none2();
    delete input[name];
    const to3 = t.encode(from3);
    if (isSome2(to3)) {
      input[t.from] = to3.value;
    }
  }
  return success(input);
}, propertySignatureTransformations, annotations);
var setAnnotation = (ast, id, value2) => ({
  ...ast,
  annotations: {
    ...ast.annotations,
    [id]: value2
  }
});
var getToPropertySignatures = (ps) => ps.map((p) => createPropertySignature(p.name, to(p.type), p.isOptional, p.isReadonly, p.annotations));
var getToIndexSignatures = (ps) => ps.map((is3) => createIndexSignature(is3.parameter, to(is3.type), is3.isReadonly));
var to = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return createDeclaration(ast.typeParameters.map(to), to(ast.type), ast.decode, ast.annotations);
    case "Tuple":
      return createTuple(ast.elements.map((e) => createElement(to(e.type), e.isOptional)), map(ast.rest, mapNonEmpty(to)), ast.isReadonly, ast.annotations);
    case "TypeLiteral":
      return createTypeLiteral(getToPropertySignatures(ast.propertySignatures), getToIndexSignatures(ast.indexSignatures), ast.annotations);
    case "Union":
      return createUnion(ast.types.map(to), ast.annotations);
    case "Lazy":
      return createLazy(() => to(ast.f()), ast.annotations);
    case "Refinement":
      return createRefinement(to(ast.from), ast.decode, false, ast.annotations);
    case "Transform":
      return to(ast.to);
  }
  return ast;
};
var from = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return createDeclaration(ast.typeParameters.map(from), from(ast.type), ast.decode, ast.annotations);
    case "Tuple":
      return createTuple(ast.elements.map((e) => createElement(from(e.type), e.isOptional)), map(ast.rest, mapNonEmpty(from)), ast.isReadonly);
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map((p) => createPropertySignature(p.name, from(p.type), p.isOptional, p.isReadonly)), ast.indexSignatures.map((is3) => createIndexSignature(is3.parameter, from(is3.type), is3.isReadonly)));
    case "Union":
      return createUnion(ast.types.map(from));
    case "Lazy":
      return createLazy(() => from(ast.f()));
    case "Refinement":
    case "Transform":
      return from(ast.from);
  }
  return ast;
};
var getCardinality = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return getCardinality(ast.type);
    case "NeverKeyword":
      return 0;
    case "Literal":
    case "UndefinedKeyword":
    case "VoidKeyword":
    case "UniqueSymbol":
      return 1;
    case "BooleanKeyword":
      return 2;
    case "StringKeyword":
    case "NumberKeyword":
    case "BigIntKeyword":
    case "SymbolKeyword":
      return 3;
    case "ObjectKeyword":
      return 5;
    case "UnknownKeyword":
    case "AnyKeyword":
      return 6;
    default:
      return 4;
  }
};
var sortPropertySignatures = /* @__PURE__ */ sort(/* @__PURE__ */ pipe(Order, /* @__PURE__ */ mapInput2((ps) => getCardinality(ps.type))));
var WeightOrder = /* @__PURE__ */ tuple(Order, Order, Order);
var maxWeight = /* @__PURE__ */ max(WeightOrder);
var emptyWeight = [0, 0, 0];
var maxWeightAll = (weights) => weights.reduce(maxWeight, emptyWeight);
var getWeight = (ast) => {
  switch (ast._tag) {
    case "Tuple": {
      const y = ast.elements.length;
      const z = isSome2(ast.rest) ? ast.rest.value.length : 0;
      return [2, y, z];
    }
    case "TypeLiteral": {
      const y = ast.propertySignatures.length;
      const z = ast.indexSignatures.length;
      return y + z === 0 ? [-4, 0, 0] : [4, y, z];
    }
    case "Declaration": {
      const [_, y, z] = getWeight(ast.type);
      return [6, y, z];
    }
    case "Lazy":
      return [8, 0, 0];
    case "Union":
      return maxWeightAll(ast.types.map(getWeight));
    case "Refinement": {
      const [x, y, z] = getWeight(ast.from);
      return [x + 1, y, z];
    }
    case "Transform":
      return getWeight(ast.from);
    case "ObjectKeyword":
      return [-2, 0, 0];
    case "UnknownKeyword":
    case "AnyKeyword":
      return [-4, 0, 0];
    default:
      return emptyWeight;
  }
};
var sortUnionMembers = /* @__PURE__ */ sort(/* @__PURE__ */ reverse(/* @__PURE__ */ mapInput2(WeightOrder, getWeight)));
var unify = (candidates) => {
  let out = pipe(candidates, flatMap2((ast) => {
    switch (ast._tag) {
      case "NeverKeyword":
        return [];
      case "Union":
        return ast.types;
      default:
        return [ast];
    }
  }));
  if (out.some(isAnyKeyword)) {
    return [anyKeyword];
  }
  if (out.some(isUnknownKeyword)) {
    return [unknownKeyword];
  }
  let i;
  if ((i = out.findIndex(isStringKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isStringKeyword(m) && !(isLiteral(m) && typeof m.literal === "string"));
  }
  if ((i = out.findIndex(isNumberKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isNumberKeyword(m) && !(isLiteral(m) && typeof m.literal === "number"));
  }
  if ((i = out.findIndex(isBooleanKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBooleanKeyword(m) && !(isLiteral(m) && typeof m.literal === "boolean"));
  }
  if ((i = out.findIndex(isBigIntKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isBigIntKeyword(m) && !(isLiteral(m) && typeof m.literal === "bigint"));
  }
  if ((i = out.findIndex(isSymbolKeyword)) !== -1) {
    out = out.filter((m, j) => j === i || !isSymbolKeyword(m) && !isUniqueSymbol(m));
  }
  return out;
};
var getParameterBase = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return ast;
    case "Refinement":
      return getParameterBase(ast.from);
  }
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/TreeFormatter.mjs
var make34 = (value2, forest = []) => ({
  value: value2,
  forest
});
var formatErrors = (errors) => drawTree(make34(`error(s) found`, errors.map(go)));
var drawTree = (tree) => tree.value + draw("\n", tree.forest);
var draw = (indentation, forest) => {
  let r = "";
  const len = forest.length;
  let tree;
  for (let i = 0; i < len; i++) {
    tree = forest[i];
    const isLast = i === len - 1;
    r += indentation + (isLast ? "\u2514" : "\u251C") + "\u2500 " + tree.value;
    r += draw(indentation + (len > 1 && !isLast ? "\u2502  " : "   "), tree.forest);
  }
  return r;
};
var formatActual = (actual) => {
  if (actual === void 0 || actual === null || typeof actual === "number" || typeof actual === "symbol" || actual instanceof Date) {
    return String(actual);
  }
  if (typeof actual === "bigint") {
    return String(actual) + "n";
  }
  try {
    return JSON.stringify(actual);
  } catch (e) {
    return String(actual);
  }
};
var formatTemplateLiteralSpan = (span) => {
  switch (span.type._tag) {
    case "StringKeyword":
      return "${string}";
    case "NumberKeyword":
      return "${number}";
  }
};
var formatTemplateLiteral = (ast) => ast.head + ast.spans.map((span) => formatTemplateLiteralSpan(span) + span.literal).join("");
var getMessage = /* @__PURE__ */ getAnnotation(MessageAnnotationId);
var getTitle = /* @__PURE__ */ getAnnotation(TitleAnnotationId);
var getIdentifier = /* @__PURE__ */ getAnnotation(IdentifierAnnotationId);
var getDescription = /* @__PURE__ */ getAnnotation(DescriptionAnnotationId);
var getExpected = (ast) => pipe(getIdentifier(ast), orElse(() => getTitle(ast)), orElse(() => getDescription(ast)));
var formatExpected = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "NumberKeyword":
    case "BooleanKeyword":
    case "BigIntKeyword":
    case "UndefinedKeyword":
    case "SymbolKeyword":
    case "ObjectKeyword":
    case "AnyKeyword":
    case "UnknownKeyword":
    case "VoidKeyword":
    case "NeverKeyword":
      return getOrElse(getExpected(ast), () => ast._tag);
    case "Literal":
      return getOrElse(getExpected(ast), () => formatActual(ast.literal));
    case "UniqueSymbol":
      return getOrElse(getExpected(ast), () => formatActual(ast.symbol));
    case "Union":
      return ast.types.map(formatExpected).join(" or ");
    case "TemplateLiteral":
      return getOrElse(getExpected(ast), () => formatTemplateLiteral(ast));
    case "Tuple":
      return getOrElse(getExpected(ast), () => "<anonymous tuple or array schema>");
    case "TypeLiteral":
      return getOrElse(getExpected(ast), () => "<anonymous type literal schema>");
    case "Enums":
      return getOrElse(getExpected(ast), () => ast.enums.map((_, value2) => JSON.stringify(value2)).join(" | "));
    case "Lazy":
      return getOrElse(getExpected(ast), () => "<anonymous lazy schema>");
    case "Declaration":
      return getOrElse(getExpected(ast), () => "<anonymous declaration schema>");
    case "Refinement":
      return getOrElse(getExpected(ast), () => "<anonymous refinement schema>");
    case "Transform":
      return getOrElse(getExpected(ast), () => `${formatExpected(ast.from)} -> ${formatExpected(ast.to)}`);
  }
};
var go = (e) => {
  switch (e._tag) {
    case "Type":
      return make34(pipe(getMessage(e.expected), map((f) => f(e.actual)), orElse(() => e.message), getOrElse(() => `Expected ${formatExpected(e.expected)}, actual ${formatActual(e.actual)}`)));
    case "Forbidden":
      return make34("is forbidden");
    case "Index": {
      const es = e.errors.map(go);
      if (es.length === 1 && es[0].forest.length !== 0) {
        return make34(`[${e.index}]${es[0].value}`, es[0].forest);
      }
      return make34(`[${e.index}]`, es);
    }
    case "Unexpected":
      return make34(`is unexpected`);
    case "Key": {
      const es = e.errors.map(go);
      if (es.length === 1 && es[0].forest.length !== 0) {
        return make34(`[${formatActual(e.key)}]${es[0].value}`, es[0].forest);
      }
      return make34(`[${formatActual(e.key)}]`, es);
    }
    case "Missing":
      return make34(`is missing`);
    case "UnionMember":
      return make34(`union member`, e.errors.map(go));
  }
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/Parser.mjs
var getEffect = (ast) => {
  const parser = go2(ast);
  return (input, options) => parser(input, {
    ...options,
    isEffectAllowed: true
  });
};
var parseResult = (schema) => go2(schema.ast);
var parse = (schema) => getEffect(schema.ast);
var encode = (schema) => getEffect(reverse5(schema.ast));
var go2 = (ast, isBoundary = true) => {
  switch (ast._tag) {
    case "Refinement": {
      if (ast.isReversed) {
        const from2 = go2(to(ast), isBoundary);
        const to2 = go2(reverse5(dropRightRefinement(ast.from)), false);
        return (i, options) => handleForbidden(flatMap10(from2(i, options), (a) => to2(a, options)), options);
      } else {
        const from2 = go2(ast.from, isBoundary);
        return (i, options) => handleForbidden(flatMap10(from2(i, options), (a) => ast.decode(a, options)), options);
      }
    }
    case "Transform": {
      const to2 = go2(ast.to, false);
      if (isBoundary) {
        const from2 = go2(ast.from);
        return (i1, options) => handleForbidden(flatMap10(from2(i1, options), (a) => flatMap10(ast.decode(a, options), (i2) => to2(i2, options))), options);
      } else {
        return (a, options) => handleForbidden(flatMap10(ast.decode(a, options), (i2) => to2(i2, options)), options);
      }
    }
    case "Declaration": {
      const decode3 = ast.decode(...ast.typeParameters);
      return (i, options) => handleForbidden(decode3(i, options), options);
    }
    case "Literal":
      return fromRefinement(ast, (u) => u === ast.literal);
    case "UniqueSymbol":
      return fromRefinement(ast, (u) => u === ast.symbol);
    case "UndefinedKeyword":
      return fromRefinement(ast, isUndefined);
    case "VoidKeyword":
      return fromRefinement(ast, isUndefined);
    case "NeverKeyword":
      return fromRefinement(ast, isNever);
    case "UnknownKeyword":
    case "AnyKeyword":
      return success;
    case "StringKeyword":
      return fromRefinement(ast, isString);
    case "NumberKeyword":
      return fromRefinement(ast, isNumber);
    case "BooleanKeyword":
      return fromRefinement(ast, isBoolean);
    case "BigIntKeyword":
      return fromRefinement(ast, isBigint);
    case "SymbolKeyword":
      return fromRefinement(ast, isSymbol);
    case "ObjectKeyword":
      return fromRefinement(ast, isObject);
    case "Enums":
      return fromRefinement(ast, (u) => ast.enums.some(([_, value2]) => value2 === u));
    case "TemplateLiteral": {
      const regex = getTemplateLiteralRegex(ast);
      return fromRefinement(ast, (u) => isString(u) && regex.test(u));
    }
    case "Tuple": {
      const elements = ast.elements.map((e) => go2(e.type, isBoundary));
      const rest = pipe(ast.rest, map(mapNonEmpty((ast2) => go2(ast2))));
      let requiredLen = ast.elements.filter((e) => !e.isOptional).length;
      if (isSome2(ast.rest)) {
        requiredLen += ast.rest.value.length - 1;
      }
      return (input, options) => {
        if (!Array.isArray(input)) {
          return failure(type2(unknownArray, input));
        }
        const allErrors = options?.errors === "all";
        const es = [];
        let stepKey = 0;
        const len = input.length;
        for (let i2 = len; i2 <= requiredLen - 1; i2++) {
          const e = index(i2, [missing]);
          if (allErrors) {
            es.push([stepKey++, e]);
            continue;
          } else {
            return failure(e);
          }
        }
        if (isNone2(ast.rest)) {
          for (let i2 = ast.elements.length; i2 <= len - 1; i2++) {
            const e = index(i2, [unexpected(input[i2])]);
            if (allErrors) {
              es.push([stepKey++, e]);
              continue;
            } else {
              return failures2(mutableAppend(sortByIndex(es), e));
            }
          }
        }
        const output = [];
        let i = 0;
        let queue = void 0;
        for (; i < elements.length; i++) {
          if (len < i + 1) {
            if (ast.elements[i].isOptional) {
              continue;
            }
          } else {
            const parser = elements[i];
            const te = parser(input[i], options);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = index(i, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              }
              output.push([stepKey++, eu.right]);
            } else {
              const nk = stepKey++;
              const index2 = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap9(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = index(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit2;
                  } else {
                    return failures2(mutableAppend(sortByIndex(es2), e));
                  }
                }
                output2.push([nk, t.right]);
                return unit2;
              }));
            }
          }
        }
        if (isSome2(rest)) {
          const head6 = headNonEmpty(rest.value);
          const tail = tailNonEmpty(rest.value);
          for (; i < len - tail.length; i++) {
            const te = head6(input[i], options);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = index(i, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              } else {
                output.push([stepKey++, eu.right]);
              }
            } else {
              const nk = stepKey++;
              const index2 = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap9(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = index(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit2;
                  } else {
                    return failures2(mutableAppend(sortByIndex(es2), e));
                  }
                } else {
                  output2.push([nk, t.right]);
                  return unit2;
                }
              }));
            }
          }
          for (let j = 0; j < tail.length; j++) {
            i += j;
            if (len < i + 1) {
              continue;
            } else {
              const te = tail[j](input[i], options);
              const eu = eitherOrUndefined(te);
              if (eu) {
                if (isLeft2(eu)) {
                  const e = index(i, eu.left.errors);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return failures2(mutableAppend(sortByIndex(es), e));
                  }
                }
                output.push([stepKey++, eu.right]);
              } else {
                const nk = stepKey++;
                const index2 = i;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es: es2,
                  output: output2
                }) => flatMap9(either3(te), (t) => {
                  if (isLeft2(t)) {
                    const e = index(index2, t.left.errors);
                    if (allErrors) {
                      es2.push([nk, e]);
                      return unit2;
                    } else {
                      return failures2(mutableAppend(sortByIndex(es2), e));
                    }
                  }
                  output2.push([nk, t.right]);
                  return unit2;
                }));
              }
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => isNonEmptyArray2(es2) ? failures2(sortByIndex(es2)) : success(sortByIndex(output2));
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend4(() => {
            const state = {
              es: Array.from(es),
              output: Array.from(output)
            };
            return flatMap9(forEach4(cqueue, (f) => f(state), {
              concurrency: "unbounded",
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          output,
          es
        });
      };
    }
    case "TypeLiteral": {
      if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
        return fromRefinement(ast, isNotNullable);
      }
      const propertySignatures = ast.propertySignatures.map((ps) => go2(ps.type, isBoundary));
      const indexSignatures = ast.indexSignatures.map((is3) => [go2(is3.parameter, isBoundary), go2(is3.type, isBoundary)]);
      const parameter = go2(createUnion(ast.indexSignatures.map((is3) => getParameterBase(is3.parameter))));
      const expectedKeys = {};
      for (let i = 0; i < propertySignatures.length; i++) {
        expectedKeys[ast.propertySignatures[i].name] = null;
      }
      return (input, options) => {
        if (!isRecord(input)) {
          return failure(type2(unknownRecord, input));
        }
        const allErrors = options?.errors === "all";
        const es = [];
        let stepKey = 0;
        const onExcessPropertyError = options?.onExcessProperty === "error";
        if (onExcessPropertyError) {
          for (const key2 of ownKeys(input)) {
            if (!Object.prototype.hasOwnProperty.call(expectedKeys, key2)) {
              const te = parameter(key2);
              const eu = eitherOrUndefined(te);
              if (eu && isLeft2(eu)) {
                const e = key(key2, [unexpected(input[key2])]);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              }
            }
          }
        }
        const output = {};
        let queue = void 0;
        for (let i = 0; i < propertySignatures.length; i++) {
          const ps = ast.propertySignatures[i];
          const parser = propertySignatures[i];
          const name = ps.name;
          if (Object.prototype.hasOwnProperty.call(input, name)) {
            const te = parser(input[name], options);
            const eu = eitherOrUndefined(te);
            if (eu) {
              if (isLeft2(eu)) {
                const e = key(name, eu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              }
              output[name] = eu.right;
            } else {
              const nk = stepKey++;
              const index2 = name;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap9(either3(te), (t) => {
                if (isLeft2(t)) {
                  const e = key(index2, t.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit2;
                  } else {
                    return failures2(mutableAppend(sortByIndex(es2), e));
                  }
                }
                output2[index2] = t.right;
                return unit2;
              }));
            }
          } else {
            if (!ps.isOptional) {
              const e = key(name, [missing]);
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return failure(e);
              }
            }
          }
        }
        for (let i = 0; i < indexSignatures.length; i++) {
          const parameter2 = indexSignatures[i][0];
          const type3 = indexSignatures[i][1];
          const keys3 = getKeysForIndexSignature(input, ast.indexSignatures[i].parameter);
          for (const key2 of keys3) {
            if (Object.prototype.hasOwnProperty.call(expectedKeys, key2)) {
              continue;
            }
            const keu = eitherOrUndefined(parameter2(key2, options));
            if (keu) {
              if (isLeft2(keu)) {
                const e = key(key2, keu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              }
            }
            const vpr = type3(input[key2], options);
            const veu = eitherOrUndefined(vpr);
            if (veu) {
              if (isLeft2(veu)) {
                const e = key(key2, veu.left.errors);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return failures2(mutableAppend(sortByIndex(es), e));
                }
              } else {
                output[key2] = veu.right;
              }
            } else {
              const nk = stepKey++;
              const index2 = key2;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap9(either3(vpr), (tv) => {
                if (isLeft2(tv)) {
                  const e = key(index2, tv.left.errors);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return unit2;
                  } else {
                    return failures2(mutableAppend(sortByIndex(es2), e));
                  }
                } else {
                  output2[key2] = tv.right;
                  return unit2;
                }
              }));
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => isNonEmptyArray2(es2) ? failures2(sortByIndex(es2)) : success(output2);
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend4(() => {
            const state = {
              es: Array.from(es),
              output: Object.assign({}, output)
            };
            return flatMap9(forEach4(cqueue, (f) => f(state), {
              concurrency: "unbounded",
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          es,
          output
        });
      };
    }
    case "Union": {
      const searchTree = _getSearchTree(ast.types);
      const ownKeys2 = ownKeys(searchTree.keys);
      const len = ownKeys2.length;
      const map14 = /* @__PURE__ */ new Map();
      for (let i = 0; i < ast.types.length; i++) {
        map14.set(ast.types[i], go2(ast.types[i], true));
      }
      return (input, options) => {
        const es = [];
        let stepKey = 0;
        let candidates = [];
        if (len > 0) {
          if (isRecord(input)) {
            for (let i = 0; i < len; i++) {
              const name = ownKeys2[i];
              const buckets = searchTree.keys[name].buckets;
              if (Object.prototype.hasOwnProperty.call(input, name)) {
                const literal2 = String(input[name]);
                if (Object.prototype.hasOwnProperty.call(buckets, literal2)) {
                  candidates = candidates.concat(buckets[literal2]);
                } else {
                  es.push([stepKey++, key(name, [type2(searchTree.keys[name].ast, input[name])])]);
                }
              } else {
                es.push([stepKey++, key(name, [missing])]);
              }
            }
          } else {
            es.push([stepKey++, type2(unknownRecord, input)]);
          }
        }
        if (searchTree.otherwise.length > 0) {
          candidates = candidates.concat(searchTree.otherwise);
        }
        let queue = void 0;
        for (let i = 0; i < candidates.length; i++) {
          const pr = map14.get(candidates[i])(input, options);
          const eu = !queue || queue.length === 0 ? eitherOrUndefined(pr) : void 0;
          if (eu) {
            if (isRight2(eu)) {
              return success(eu.right);
            } else {
              es.push([stepKey++, unionMember(eu.left.errors)]);
            }
          } else {
            const nk = stepKey++;
            if (!queue) {
              queue = [];
            }
            queue.push((state) => suspend4(() => {
              if ("finalResult" in state) {
                return unit2;
              } else {
                return flatMap9(either3(pr), (t) => {
                  if (isRight2(t)) {
                    state.finalResult = success(t.right);
                  } else {
                    state.es.push([nk, unionMember(t.left.errors)]);
                  }
                  return unit2;
                });
              }
            }));
          }
        }
        const computeResult = (es2) => isNonEmptyArray2(es2) ? failures2(sortByIndex(es2)) : (
          // this should never happen
          failure(type2(neverKeyword, input))
        );
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend4(() => {
            const state = {
              es: Array.from(es)
            };
            return flatMap9(forEach4(cqueue, (f) => f(state), {
              concurrency: 1,
              discard: true
            }), () => {
              if ("finalResult" in state) {
                return state.finalResult;
              }
              return computeResult(state.es);
            });
          });
        }
        return computeResult(es);
      };
    }
    case "Lazy": {
      const get12 = memoizeThunk(() => go2(ast.f(), isBoundary));
      return (a, options) => get12()(a, options);
    }
  }
};
var fromRefinement = (ast, refinement) => (u) => refinement(u) ? success(u) : failure(type2(ast, u));
var _getLiterals = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return _getLiterals(ast.type);
    case "TypeLiteral": {
      const out = [];
      for (let i = 0; i < ast.propertySignatures.length; i++) {
        const propertySignature2 = ast.propertySignatures[i];
        const type3 = from(propertySignature2.type);
        if (isLiteral(type3) && !propertySignature2.isOptional) {
          out.push([propertySignature2.name, type3]);
        }
      }
      return out;
    }
    case "Refinement":
    case "Transform":
      return _getLiterals(ast.from);
  }
  return [];
};
var _getSearchTree = (members) => {
  const keys3 = {};
  const otherwise = [];
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const tags2 = _getLiterals(member);
    if (tags2.length > 0) {
      for (let j = 0; j < tags2.length; j++) {
        const [key2, literal2] = tags2[j];
        const hash2 = String(literal2.literal);
        keys3[key2] = keys3[key2] || {
          buckets: {},
          ast: neverKeyword
        };
        const buckets = keys3[key2].buckets;
        if (Object.prototype.hasOwnProperty.call(buckets, hash2)) {
          if (j < tags2.length - 1) {
            continue;
          }
          buckets[hash2].push(member);
          keys3[key2].ast = createUnion([keys3[key2].ast, literal2]);
        } else {
          buckets[hash2] = [member];
          keys3[key2].ast = createUnion([keys3[key2].ast, literal2]);
          break;
        }
      }
    } else {
      otherwise.push(member);
    }
  }
  return {
    keys: keys3,
    otherwise
  };
};
var dropRightRefinement = (ast) => isRefinement(ast) ? dropRightRefinement(ast.from) : ast;
var handleForbidden = (conditional, options) => {
  const eu = eitherOrUndefined(conditional);
  return eu ? eu : options?.isEffectAllowed === true ? conditional : failure(forbidden);
};
var unknownArray = /* @__PURE__ */ createTuple([], /* @__PURE__ */ some2([unknownKeyword]), true, {
  [DescriptionAnnotationId]: "a generic array"
});
var unknownRecord = /* @__PURE__ */ createTypeLiteral([], [/* @__PURE__ */ createIndexSignature(stringKeyword, unknownKeyword, true), /* @__PURE__ */ createIndexSignature(symbolKeyword, unknownKeyword, true)], {
  [DescriptionAnnotationId]: "a generic object"
});
var mutableAppend = (self, a) => {
  self.push(a);
  return self;
};
var getTemplateLiteralRegex = (ast) => {
  let pattern = `^${ast.head}`;
  for (const span of ast.spans) {
    if (isStringKeyword(span.type)) {
      pattern += ".*";
    } else if (isNumberKeyword(span.type)) {
      pattern += "-?\\d+(\\.\\d+)?";
    }
    pattern += span.literal;
  }
  pattern += "$";
  return new RegExp(pattern);
};
function sortByIndex(es) {
  return es.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0).map(([_, a]) => a);
}
var reverse5 = (ast) => {
  switch (ast._tag) {
    case "Declaration":
      return createDeclaration(ast.typeParameters.map(reverse5), ast.type, ast.decode, ast.annotations);
    case "Tuple":
      return createTuple(ast.elements.map((e) => createElement(reverse5(e.type), e.isOptional)), map(ast.rest, mapNonEmpty(reverse5)), ast.isReadonly);
    case "TypeLiteral":
      return createTypeLiteral(ast.propertySignatures.map((ps) => createPropertySignature(ps.name, reverse5(ps.type), ps.isOptional, ps.isReadonly, ps.annotations)), ast.indexSignatures.map((is3) => createIndexSignature(is3.parameter, reverse5(is3.type), is3.isReadonly)));
    case "Union":
      return createUnion(ast.types.map(reverse5));
    case "Lazy":
      return createLazy(() => reverse5(ast.f()));
    case "Refinement":
      return createRefinement(ast.from, ast.decode, !ast.isReversed, ast.annotations);
    case "Transform":
      return _createTransform(reverse5(ast.to), reverse5(ast.from), ast.encode, ast.decode, ast.propertySignatureTransformations.map((t) => createPropertySignatureTransformation(t.to, t.from, t.encode, t.decode)));
  }
  return ast;
};

// node_modules/.pnpm/@effect+schema@0.33.0_@effect+data@0.17.6_@effect+io@0.38.2/node_modules/@effect/schema/mjs/Schema.mjs
var TypeId13 = /* @__PURE__ */ Symbol.for("@effect/schema/Schema");
var SchemaImpl = class {
  constructor(ast) {
    __publicField(this, "ast");
    __publicField(this, "_id", TypeId13);
    __publicField(this, "From");
    __publicField(this, "To");
    this.ast = ast;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var make35 = (ast) => new SchemaImpl(ast);
var makeLiteral = (value2) => make35(createLiteral(value2));
var literal = (...literals) => union8(...literals.map((literal2) => makeLiteral(literal2)));
var declare = (typeParameters, type3, decode3, annotations) => make35(createDeclaration(typeParameters.map((tp) => tp.ast), type3.ast, (...typeParameters2) => decode3(...typeParameters2.map(make35)), annotations));
var union8 = (...members) => make35(createUnion(members.map((m) => m.ast)));
var array6 = (item) => make35(createTuple([], some2([item.ast]), true));
var PropertySignatureImpl = class _PropertySignatureImpl {
  constructor(_from, _annotations, _optional) {
    __publicField(this, "_from");
    __publicField(this, "_annotations");
    __publicField(this, "_optional");
    __publicField(this, "From");
    __publicField(this, "FromIsOptional");
    __publicField(this, "To");
    __publicField(this, "ToIsOptional");
    this._from = _from;
    this._annotations = _annotations;
    this._optional = _optional;
  }
  optional() {
    if (this._optional) {
      throw new Error(`duplicate optional configuration`);
    }
    return new _PropertySignatureImpl(this._from, this._annotations, {
      to: "optional"
    });
  }
  withDefault(value2) {
    if (this._optional && this._optional.to !== "optional") {
      throw new Error(`duplicate optional configuration`);
    }
    return new _PropertySignatureImpl(this._from, this._annotations, {
      to: "default",
      value: value2
    });
  }
  toOption() {
    if (this._optional && this._optional.to !== "optional") {
      throw new Error(`duplicate optional configuration`);
    }
    return new _PropertySignatureImpl(this._from, this._annotations, {
      to: "Option"
    });
  }
};
var propertySignature = (schema, annotations) => new PropertySignatureImpl(schema.ast, annotations);
var optional = (schema, annotations) => propertySignature(schema, annotations).optional();
var struct3 = (fields) => {
  const ownKeys2 = ownKeys(fields);
  const propertySignatures = [];
  const fromPropertySignatures = [];
  const toPropertySignatures = [];
  const propertySignatureTransformations = [];
  for (let i = 0; i < ownKeys2.length; i++) {
    const key2 = ownKeys2[i];
    const field = fields[key2];
    if (field instanceof PropertySignatureImpl) {
      const optional2 = field._optional;
      if (optional2) {
        switch (optional2.to) {
          case "optional": {
            propertySignatures.push(createPropertySignature(key2, field._from, true, true, field._annotations));
            fromPropertySignatures.push(createPropertySignature(key2, field._from, true, true));
            toPropertySignatures.push(createPropertySignature(key2, to(field._from), true, true, field._annotations));
            break;
          }
          case "default": {
            fromPropertySignatures.push(createPropertySignature(key2, field._from, true, true));
            toPropertySignatures.push(createPropertySignature(key2, to(field._from), false, true, field._annotations));
            propertySignatureTransformations.push(createPropertySignatureTransformation(key2, key2, orElse(() => some2(optional2.value())), identity));
            break;
          }
          case "Option": {
            fromPropertySignatures.push(createPropertySignature(key2, field._from, true, true));
            toPropertySignatures.push(createPropertySignature(key2, optionFromSelf(make35(to(field._from))).ast, false, true, field._annotations));
            propertySignatureTransformations.push(createPropertySignatureTransformation(key2, key2, some2, flatten));
            break;
          }
        }
      } else {
        propertySignatures.push(createPropertySignature(key2, field._from, false, true, field._annotations));
        fromPropertySignatures.push(createPropertySignature(key2, field._from, false, true));
        toPropertySignatures.push(createPropertySignature(key2, to(field._from), false, true, field._annotations));
      }
    } else {
      propertySignatures.push(createPropertySignature(key2, field.ast, false, true));
      fromPropertySignatures.push(createPropertySignature(key2, field.ast, false, true));
      toPropertySignatures.push(createPropertySignature(key2, to(field.ast), false, true));
    }
  }
  if (propertySignatureTransformations.length > 0) {
    return make35(createTransformByPropertySignatureTransformations(createTypeLiteral(fromPropertySignatures, []), createTypeLiteral(toPropertySignatures, []), propertySignatureTransformations));
  } else {
    return make35(createTypeLiteral(propertySignatures, []));
  }
};
var toAnnotations = (options) => {
  const annotations = {};
  if (options?.typeId !== void 0) {
    const typeId = options?.typeId;
    if (typeof typeId === "object") {
      annotations[TypeAnnotationId] = typeId.id;
      annotations[typeId.id] = typeId.params;
    } else {
      annotations[TypeAnnotationId] = typeId;
    }
  }
  if (options?.message !== void 0) {
    annotations[MessageAnnotationId] = options?.message;
  }
  if (options?.identifier !== void 0) {
    annotations[IdentifierAnnotationId] = options?.identifier;
  }
  if (options?.title !== void 0) {
    annotations[TitleAnnotationId] = options?.title;
  }
  if (options?.description !== void 0) {
    annotations[DescriptionAnnotationId] = options?.description;
  }
  if (options?.examples !== void 0) {
    annotations[ExamplesAnnotationId] = options?.examples;
  }
  if (options?.documentation !== void 0) {
    annotations[DocumentationAnnotationId] = options?.documentation;
  }
  if (options?.jsonSchema !== void 0) {
    annotations[JSONSchemaAnnotationId] = options?.jsonSchema;
  }
  if (options?.arbitrary !== void 0) {
    annotations[ArbitraryHookId] = options?.arbitrary;
  }
  return annotations;
};
function filter6(predicate, options) {
  return (self) => {
    const decode3 = (a) => predicate(a) ? success(a) : failure(type2(ast, a));
    const ast = createRefinement(self.ast, decode3, false, toAnnotations(options));
    return make35(ast);
  };
}
var transformResult = /* @__PURE__ */ dual(4, (from2, to2, decode3, encode2) => make35(createTransform(from2.ast, to2.ast, decode3, encode2)));
var description = (description2) => (self) => make35(setAnnotation(self.ast, DescriptionAnnotationId, description2));
var string5 = /* @__PURE__ */ make35(stringKeyword);
var number6 = /* @__PURE__ */ make35(numberKeyword);
var dateArbitrary = () => (fc) => fc.date();
var datePretty = () => (date4) => `new Date(${JSON.stringify(date4)})`;
var DateFromSelf = /* @__PURE__ */ declare([], /* @__PURE__ */ struct3({}), () => (u) => !isDate(u) ? failure(type2(DateFromSelf.ast, u)) : success(u), {
  [IdentifierAnnotationId]: "Date",
  [PrettyHookId]: datePretty,
  [ArbitraryHookId]: dateArbitrary
});
var ValidDateTypeId = "@effect/schema/ValidDateTypeId";
var validDate = (options) => (self) => self.pipe(filter6((a) => !isNaN(a.getTime()), {
  typeId: ValidDateTypeId,
  description: "a valid Date",
  ...options
}));
var ValidDateFromSelf = /* @__PURE__ */ DateFromSelf.pipe(/* @__PURE__ */ validDate());
var dateFromString = (self) => {
  const schema = transformResult(
    self,
    ValidDateFromSelf,
    (s) => success(new Date(s)),
    (n) => success(n.toISOString())
    // this is safe because `self` will check its input anyway
  );
  return schema;
};
var optionArbitrary = (value2) => (fc) => fc.oneof(fc.constant(none2()), value2(fc).map(some2));
var optionPretty = (value2) => match2({
  onNone: () => "none()",
  onSome: (a) => `some(${value2(a)})`
});
var optionInline = (value2) => union8(struct3({
  _tag: literal("None")
}), struct3({
  _tag: literal("Some"),
  value: value2
}));
var optionFromSelf = (value2) => {
  const schema = declare([value2], optionInline(value2), (value3) => {
    const parse2 = parseResult(value3);
    return (u, options) => !isOption2(u) ? failure(type2(schema.ast, u)) : isNone2(u) ? success(none2()) : map13(parse2(u.value, options), some2);
  }, {
    [IdentifierAnnotationId]: "Option",
    [PrettyHookId]: optionPretty,
    [ArbitraryHookId]: optionArbitrary
  });
  return schema;
};
var MaxLengthTypeId = "@effect/schema/MaxLengthTypeId";
var maxLength = (maxLength2, options) => (self) => self.pipe(filter6((a) => a.length <= maxLength2, {
  typeId: MaxLengthTypeId,
  description: `a string at most ${maxLength2} character(s) long`,
  jsonSchema: {
    maxLength: maxLength2
  },
  ...options
}));

// src/config.ts
var import_promises = __toESM(require("fs/promises"));
var Globber = __toESM(require("@actions/glob"));

// src/error.ts
var GenericError = class extends Data_exports2.TaggedClass("GenericError") {
};

// src/config.ts
var actionInput = Config_exports.string("INPUT_FILE").pipe(
  Config_exports.map((path) => ({ _tag: "File", path })),
  Config_exports.orElse(
    () => Config_exports.string("JSON").pipe(
      Config_exports.map((value2) => ({
        _tag: "Json",
        stringified: value2
      }))
    )
  ),
  Config_exports.orElse(
    () => pipe(
      Config_exports.all({
        key: Config_exports.string("KEY"),
        value: Config_exports.number("VALUE")
      }),
      Config_exports.map(({ key: key2, value: value2 }) => ({ _tag: "KeyVal", key: key2, value: value2 }))
    )
  ),
  Config_exports.nested("INPUT")
);
var getInput = pipe(
  Effect_exports.config(actionInput),
  Effect_exports.mapError(
    (error2) => new GenericError({
      error: error2,
      message: `Failed to read input`
    })
  )
);
var parseJson = (json) => Effect_exports.try({
  try: () => JSON.parse(json),
  catch: (error2) => new GenericError({ message: `Failed to parse JSON`, error: error2 })
});
var Trend = literal("lower-is-better", "higher-is-better");
var Metric = struct3({
  key: pipe(string5, maxLength(120)),
  sortDate: pipe(string5, dateFromString, optional),
  value: number6,
  units: pipe(string5, maxLength(32), optional),
  trend: pipe(Trend, optional)
});
var RequestBody = struct3({
  metrics: pipe(Metric, array6)
});
var MetricSchema = struct3({
  key: pipe(
    string5,
    maxLength(120),
    description("a key to identify the metric across runs")
  ),
  value: pipe(number6, description("the value of the metric")),
  sortDate: pipe(
    string5,
    dateFromString,
    description(
      "the date to apply sorting by. defaults to the commit time"
    ),
    optional
  ),
  units: pipe(
    string5,
    maxLength(32),
    description("the units of the metric. example: ms, MiB"),
    optional
  ),
  trend: pipe(Trend, optional)
});
var FileSchema = union8(
  pipe(MetricSchema, array6),
  MetricSchema
);
var encodeFileSchema = encode(FileSchema);
var parseFileSchema = (json) => parse(FileSchema)(json).pipe(
  Effect_exports.map((x) => [x].flat()),
  Effect_exports.mapError(
    (error2) => new GenericError({
      error: error2,
      message: `Failed to parse given JSON:
${formatErrors(
        error2.errors
      )}`
    })
  )
);
var parseFile = (pathname) => Effect_exports.tryPromise({
  try: () => import_promises.default.readFile(pathname, "utf-8"),
  catch: (error2) => new GenericError({ message: `Failed to read file`, error: error2 })
}).pipe(Effect_exports.flatMap(parseJson), Effect_exports.flatMap(parseFileSchema));
var parseGlob = (glob) => Effect_exports.gen(function* (_) {
  const globber = yield* _(
    Effect_exports.tryPromise({
      try: () => Globber.create(glob),
      catch: (error2) => new GenericError({ message: `Failed to parse glob syntax`, error: error2 })
    })
  );
  const paths = yield* _(
    Effect_exports.tryPromise({
      try: () => globber.glob(),
      catch: (error2) => new GenericError({
        message: `Failed to iterate through glob`,
        error: error2
      })
    })
  );
  const jsons = yield* _(
    Effect_exports.all(paths.map(parseFile), { concurrency: 5 })
  );
  return jsons.flat();
});
var readMetrics = pipe(
  Match_exports.type(),
  Match_exports.tagsExhaustive({
    File: ({ path }) => parseGlob(path),
    Json: ({ stringified }) => parseJson(stringified).pipe(Effect_exports.flatMap(parseFileSchema)),
    KeyVal: ({ key: key2, value: value2 }) => Effect_exports.succeed([{ key: key2, value: value2 }])
  })
);

// src/index.ts
var import_core2 = require("@actions/core");
var import_http_client = require("@actions/http-client");

// src/util.ts
var exhaustiveEffect = (_) => {
  return _;
};

// src/index.ts
var getHttpClient = Effect_exports.gen(function* (_) {
  const idToken = yield* _(
    Effect_exports.tryPromise({
      try: () => (0, import_core2.getIDToken)(),
      catch: (error2) => new GenericError({
        message: `Failed to get ID token, maybe you need to configure the permissions.`,
        error: error2
      })
    })
  );
  const httpClient = new import_http_client.HttpClient(`bnz-action`, [], {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return httpClient;
});
var main = Effect_exports.gen(function* (_) {
  const input = yield* _(getInput);
  const metrics = yield* _(readMetrics(input));
  const httpClient = yield* _(getHttpClient);
  const response = yield* _(
    Effect_exports.tryPromise({
      try: () => httpClient.postJson("https://bnz-web.vercel.app/api/metrics", {
        metrics
      }),
      catch: (error2) => new GenericError({
        message: `Failed to send metrics`,
        error: error2
      })
    })
  );
  console.log(`received`, response);
});
main.pipe(
  Effect_exports.catchTag("GenericError", (err) => {
    (0, import_core2.error)(err.message);
    process.exitCode = 1;
    return Effect_exports.unit;
  }),
  exhaustiveEffect,
  Effect_exports.runPromise
);
