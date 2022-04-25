import { Subject } from 'rxjs';

const subject = new Subject();

export  const dataService = {
    setData: (b,upe,lp,up,p,
              bm,upem,lpm,upm,pm) =>
                   subject.next({ balance: b ,usdtPending:upe,LastPaid:lp,usdtPaid:up,position:p,
              balanceSlm:bm ,usdtPendingSlm:upem,lastPaidM:lpm,usdPaidM:upm,positionM:pm}),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};



// export  const dataService_SLRM = {
//     setData: (b,upe,lp,up,p) => subject.next({ balance: b ,usdtPending:upe,LastPaid:lp,usdtPaid:up,position:p}),
//     clearData: () => subject.next(),
//     getData: () => subject.asObservable()
// };
