import React, {
  createContext,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type bookFormType = {
  date: string;
  bookTime: string;
  child: number;
  adult: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  sendDeal: boolean;
};

type contextType = {
  sortTitle: string;
  setSortTitle: React.Dispatch<SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<SetStateAction<string>>;

  bookForm: bookFormType;
  setBookForm: React.Dispatch<SetStateAction<bookFormType>>;
  contactCode: string;
  setContactCode: React.Dispatch<SetStateAction<string>>;

  totalPrice: number;
  setTotalPrice: React.Dispatch<SetStateAction<number>>;
};

const TravelMaker = createContext<contextType>({} as contextType);

const BookingContext = ({ children }: { children: React.ReactNode }) => {
  const [sortTitle, setSortTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [contactCode, setContactCode] = useState("+1");
  const [bookForm, setBookForm] = useState<bookFormType>({
    date: "",
    bookTime: "",
    child: 0,
    adult: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    sendDeal: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <TravelMaker.Provider
      value={{
        sortTitle,
        setSortTitle,
        errorMsg,
        setErrorMsg,

        bookForm,
        setBookForm,
        contactCode,
        setContactCode,

        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </TravelMaker.Provider>
  );
};

export default BookingContext;

export const useBookingContext = () => useContext(TravelMaker);
