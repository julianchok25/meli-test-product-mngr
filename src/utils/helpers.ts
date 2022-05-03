class Helpers {

    public decimalCount(price: number): number {
        const numStr = String(price);

        if (numStr.includes('.')) {
            return numStr.split('.')[1].length;
         }

         return 0;
    }

    public addCorsWhiteList(whiteListDomains: string[], isLocal?: boolean): any {
        if (!isLocal || !!whiteListDomains.length) {
            const corsOptions = {
                origin: (origin: any, callback: any) => {
                    if (whiteListDomains.indexOf(origin) !== -1) {
                        callback(null, true);
                  } else {
                        callback(new Error('Not allowed by CORS'));
                  }
                }
            };

            return corsOptions;
        }

        return {origin: '*'};
    }
}

export const helpers = new Helpers();