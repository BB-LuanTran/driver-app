import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

export type GoogleData = {
  data: GooglePlaceData;
  details?: GooglePlaceDetail;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type DriverType = {
  id: number;
  name: string;
};

export type BookingHistory = {
  id: string;
  accountId: string;
  account: Account;
  driverId: string;
  driver: Driver;
  bookAt: Date;
  from: string;
  to: string;
};

export type Account = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  azureOid: string;
  phoneNumber: string;
  address: string;
  displayName: string;
  driverType: number | null;
  Driver: Driver | null;
};

export type Driver = {
  account: Account;
  BookingHistory: BookingHistory[];
  driverType: DriverType;
  // currentPlace?: Coordinates;
};
