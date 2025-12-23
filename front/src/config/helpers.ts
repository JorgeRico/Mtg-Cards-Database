import { useToast } from 'vue-toastification';

const toast = useToast();

interface CardData {
    id              : number,
    idSet           : number,
    cardName        : string,
    cardJsonLink    : string,
    cardUri         : string,
    cardImg         : string,
    special         : number,
    own             : number,
    pendingToArrive : number,
    isOnADeck       : number,
    isBackCard      : number,
    needUpgrade     : number,
    isOversized     : number,
    setName         : string,
    setLogo         : string,
    isMolCard       : number
}   

const helpers = {
    setClassName(key: string, value: number, isClick: boolean) {
        if (isClick === true && value != 1 && key == 'own') {
            return 'complete';
        }

        if (isClick === false && value == 1 && key == 'own') {
            return 'complete';
        }

        if (isClick === true && value != 1 && key == 'isMolCard') {
            return 'isMolCard';
        }

        if (isClick === false && value == 1 && key == 'isMolCard') {
            return 'isMolCard';
        }

        return '';
    },

    async updateCardDataInfo(key: string, value: number, item: CardData) {
        var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + item.idSet + '/cards/' + item.id;

        const requestOptions = {
            method  : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ [key]: value})
        };

        await fetch(url, requestOptions).then((response) => {
            if (key == 'own') {
                item.own = value;
                
                if (value == 1) {
                    item.pendingToArrive = 0;
                }
            }

            if (key == 'needUpgrade') {
                item.needUpgrade = value;
            }

            if (key == 'isOnADeck') {
                item.isOnADeck = value;
            }

            if (key == 'pendingToArrive') {
                item.pendingToArrive = value;
                if (value == 1) {
                    item.own = 0;
                }
            }

            if (key == 'isSpecial') {
                item.special = value;
            }

            if (key == 'isMolCard') {
                item.isMolCard = value;
            }

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                toast.error(error);
                return Promise.reject(error);
            } else {
                toast.success('Successfully updated')
            }

        }).catch((error) => {
            console.log('Looks like there was a problem: \n', error);
            toast.error('There was an error!');
        });
    }

}

export default helpers