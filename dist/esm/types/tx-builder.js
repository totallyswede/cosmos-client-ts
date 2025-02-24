import { codec } from '.';
import { cosmos } from '../proto';
import Long from 'long';
export class TxBuilder {
    sdk;
    txRaw;
    constructor(sdk, body, authInfo) {
        this.sdk = sdk;
        const bodyBytes = cosmos.tx.v1beta1.TxBody.encode(body).finish();
        const authInfoBytes = cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();
        this.txRaw = new cosmos.tx.v1beta1.TxRaw({
            body_bytes: bodyBytes,
            auth_info_bytes: authInfoBytes,
            signatures: [],
        });
    }
    signDoc(accountNumber) {
        if (typeof accountNumber === 'number') {
            accountNumber = Long.fromNumber(accountNumber);
        }
        const signDoc = new cosmos.tx.v1beta1.SignDoc({
            body_bytes: this.txRaw.body_bytes,
            auth_info_bytes: this.txRaw.auth_info_bytes,
            chain_id: this.sdk.chainID,
            account_number: accountNumber?.isZero() ? null : accountNumber,
        });
        return signDoc;
    }
    signDocBytes(accountNumber) {
        return cosmos.tx.v1beta1.SignDoc.encode(this.signDoc(accountNumber)).finish();
    }
    addSignature(sig) {
        this.txRaw.signatures.push(sig);
    }
    /**
     * @link BroadcastTxRequest
     */
    txBytes() {
        const bytes = cosmos.tx.v1beta1.TxRaw.encode(this.txRaw).finish();
        return Buffer.from(bytes).toString('base64');
    }
    cosmosJSONStringify(space) {
        const body = cosmos.tx.v1beta1.TxBody.decode(this.txRaw.body_bytes);
        const authInfo = cosmos.tx.v1beta1.AuthInfo.decode(this.txRaw.auth_info_bytes);
        return JSON.stringify(codec.packCosmosAny({
            body,
            auth_info: authInfo,
            signatures: this.txRaw.signatures,
        }), undefined, space);
    }
}
