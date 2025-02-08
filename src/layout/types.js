const { VITE_HIDE_HOME } = import.meta.env;
export const routerArrays = VITE_HIDE_HOME === "false"
    ? [
        {
            path: "/welcome",
            meta: {
                title: "menus.pureHome",
                icon: "ep:home-filled"
            }
        }
    ]
    : [];
//# sourceMappingURL=types.js.map