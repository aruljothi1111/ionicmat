import { Injectable } from '@angular/core';
    
@Injectable()
export class ClientService {
    private clients: any[] = [
        {
            id: '1',
            name: 'Priyanka',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/seed/picsum/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            sort_id:"1"
        },
        {
            id: '2',
            name: 'Aarthi',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/id/25/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            sort_id:"2"
        },
        {
            id: '3',
            name: 'Shilpa',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/id/26/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            choosed:false,
            sort_id:"3"
        },
        {
            id: '4',
            name: 'Oviya',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/id/27/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            choosed:false,
            sort_id:"4"
        },
        {
            id: '5',
            name: 'Dhana',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/id/28/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            choosed:false,
            sort_id:"5"

        },
        {
            id: '6',
            name: 'Siva',
            description: '22 yrs, 5ft 2in ,Tamil ,Nair, MBBS, Doctor,Chennai',
            image: 'https://picsum.photos/id/29/200/300',
            shortlist:false,
            status:'Verified',
            pack:'Premium NRI',
            choosed:false,
            sort_id:"6"
        }
    ]; 
    getClientsData() {
        return this.clients;
    }

    getClients() {
        return Promise.resolve(this.getClientsData());
    }
    setObjects(newObjects: any[]): void {
        this.clients = newObjects;
      }
};