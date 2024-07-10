import { User } from '../../src/core/models';

export const data: Partial<User>[] = [
  {
    id: '8295e838-a592-11ea-907b-0242ac160002',
    firstName: 'Wouter',
    middleName: 'van der',
    lastName: 'Ham',
    role: 'admin',
    email: 'woutervanderham@hotmail.nl',
    password: '$2b$08$509myPgiCxI.bS7WC3D2hO7b.3LJTRmNH1c3Mj4qUE/WFOv6d11Fu',
    hash: null,
    deleted: null,
  },
  {
    id: 'a50e115b-c211-49af-a95d-95911b1fb61f',
    firstName: 'Via',
    middleName: null,
    lastName: 'Tim',
    role: 'admin',
    email: 'info@viatim.nl',
    password: '$2b$08$509myPgiCxI.bS7WC3D2hO7b.3LJTRmNH1c3Mj4qUE/WFOv6d11Fu',
    hash: null,
    deleted: null,
  },
];
