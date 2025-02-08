import { ref } from "vue";
export function useBoolean(initValue = false) {
    const bool = ref(initValue);
    function setBool(value) {
        bool.value = value;
    }
    function setTrue() {
        setBool(true);
    }
    function setFalse() {
        setBool(false);
    }
    function toggle() {
        setBool(!bool.value);
    }
    return {
        bool,
        setBool,
        setTrue,
        setFalse,
        toggle
    };
}
//# sourceMappingURL=useBoolean.js.map