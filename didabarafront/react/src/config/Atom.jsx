import { atom, selector } from "recoil";

export const User = {
  id: "",
  password: "",
  token: "",
};

export const userState = atom({
  key: "userState",
  default: User | null,
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const myDocumentState = atom({
  key: "documentState",
  default: [{ id: 1 }],
});

export const menuState = atom({
  key: "menuState",
  default: "Listing",
});

export const categoryItem = atom({
  key: "categoryId",
  default: [],
});

export const itemMenuSelector = selector({
  key: "itemSelector",
  get: ({ get }) => {
    const menu = get(menuState);
    const items = get(categoryItem);
    if (items.length === 0) return null;
    switch (menu) {
      case "Listing":
        return items.filter(
          (item) => Date.parse(item.expiredDate) > Date.now()
        );

      case "Out Dated":
        return items.filter(
          (item) => Date.parse(item.expiredDate) < Date.now()
        );

      case "All List":
        return items;
    }
  },
});
