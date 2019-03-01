import web3 from "web3";

const { toBN, leftPad } = web3.utils;

export const normHex = i => (`${i}`.startsWith("0x") ? i.slice(2) : i);

export const asAddress = adr => `0x${leftPad(normHex(adr.toString(16)), 40)}`;

export const asBytes32 = num => `${leftPad(num.toString(16), 64)}`;

export const addWithOverflow = (a, b) => toBN(a).add(toBN(b)).maskn(256)
