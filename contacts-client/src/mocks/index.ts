import {Contact, User} from '~/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date().toDateString(),
  },
  {
    id: '2',
    firstName: 'Robin',
    lastName: 'Jiménez',
    email: 'robin@robin.com',
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date().toDateString(),
  },
  {
    id: '3',
    firstName: 'Mr',
    lastName: 'Bean',
    email: 'bean@bean.com',
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date().toDateString(),
  },
];

export const mockUser: User = {
  id: 'user-1',
  username: 'robin',
  email: 'robin@robin.com',
  accessToken: '12341234',
};
