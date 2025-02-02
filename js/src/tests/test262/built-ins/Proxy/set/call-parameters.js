// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.9
description: >
    [[Set]] ( P, V, Receiver)

    9. Let booleanTrapResult be ToBoolean(Call(trap, handler, «target, P, V,
    Receiver»)).

---*/

var _target, _handler, _prop, _value, _receiver;
var target = {};
var handler = {
  set: function(t, prop, value, receiver) {
    _handler = this;
    _target = t;
    _prop = prop;
    _value = value;
    _receiver = receiver;
    return t[prop] = value;
  }
};
var p = new Proxy(target, handler);

p.attr = "foo";

assert.sameValue(_handler, handler, "handler object as the trap context");
assert.sameValue(_target, target, "first argument is the target object");
assert.sameValue(_prop, "attr", "second argument is the property name");
assert.sameValue(_value, "foo", "third argument is the new value");
assert.sameValue(_receiver, p, "forth argument is the proxy object");

reportCompare(0, 0);
