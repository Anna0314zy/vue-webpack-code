export class Cancel {
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}
export function isCancel(error: any) {
    return error instanceof Cancel;
}
export class CancelToken {
    public resolve: any;
    source() {
        return {
            token: new Promise((resolve) => {
                console.log(this, 'this----');
                this.resolve = resolve;
            }),
            cancel: (message: string) => {
                this.resolve(new Cancel(message));
                //看下 message 是不是 Cancle实例的
            }
        }
    }
}