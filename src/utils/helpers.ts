class Helpers {

    public decimalCount(price: number): number {
        const numStr = String(price);

        if (numStr.includes('.')) {
            return numStr.split('.')[1].length;
         }

         return 0;
    }
}

export const helpers = new Helpers();