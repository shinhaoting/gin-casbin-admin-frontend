import propTypes from "@/utils/propTypes";
export const reboundProps = {
    delay: propTypes.number.def(1),
    blur: propTypes.number.def(2),
    i: {
        type: Number,
        required: false,
        default: 0,
        validator(value) {
            return value < 10 && value >= 0 && Number.isInteger(value);
        }
    }
};
//# sourceMappingURL=props.js.map