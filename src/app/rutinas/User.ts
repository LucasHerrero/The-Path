export interface User {
  user_id:           number;
  username:          string;
  password:          string;
  email:             string;
  birthday:          Date | null;
  height:            number | null;
  kg:                number | null;
  registration_date: Date;
}
