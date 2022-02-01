import { AddressPrefix } from './prefix';
export const bech32Prefix = {
    accAddr: AddressPrefix.Cosmos,
    accPub: AddressPrefix.Cosmos + AddressPrefix.Public,
    valAddr: AddressPrefix.Cosmos + AddressPrefix.Validator + AddressPrefix.Operator,
    valPub: AddressPrefix.Cosmos + AddressPrefix.Validator + AddressPrefix.Operator + AddressPrefix.Public,
    consAddr: AddressPrefix.Cosmos + AddressPrefix.Validator + AddressPrefix.Consensus,
    consPub: AddressPrefix.Cosmos + AddressPrefix.Validator + AddressPrefix.Consensus + AddressPrefix.Public,
};
export function setBech32NetworkPrefix(value) {
    bech32Prefix.accAddr = value;
    bech32Prefix.accPub = value + AddressPrefix.Public;
    bech32Prefix.valAddr = value + AddressPrefix.Validator + AddressPrefix.Operator;
    bech32Prefix.valPub = value + AddressPrefix.Validator + AddressPrefix.Operator + AddressPrefix.Public;
    bech32Prefix.consAddr = value + AddressPrefix.Validator + AddressPrefix.Consensus;
    bech32Prefix.consPub = value + AddressPrefix.Validator + AddressPrefix.Consensus + AddressPrefix.Public;
}
export function setBech32Prefix(value) {
    bech32Prefix.accAddr = value.accAddr;
    bech32Prefix.accPub = value.accPub;
    bech32Prefix.valAddr = value.valAddr;
    bech32Prefix.valPub = value.valPub;
    bech32Prefix.consAddr = value.consAddr;
    bech32Prefix.consPub = value.consPub;
}
