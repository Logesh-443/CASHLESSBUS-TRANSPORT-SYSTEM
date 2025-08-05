const validateField = (name, value, formData) => {

    switch (name) {
        //Display error message if the name textbox is empty or contains less than 3 charcters
        case "busName":
            if (value.length === 0) {
                return "Name is required";
            }

            if (value.length < 3) {
                return "Name Should be Atleast 3 characters Long";
            }
            //if not empty and more that 3 charcters,then entered data is updated in formData
            return "";
        case "busNo":
            if (value.length === 0) {
                return "busNo is required";
            }
            //if not empty and more that 3 charcters,then entered data is updated in formData
            return "";
        case "registrationNo":
            if (!value) {
                return "registrationNo is required";
            }
            return "";
        case "source":
            if (!value) {
                return "address is required";
            }
            return "";
        case "destinantion":
            if (value.length === 0) {
                return "review is required";
            }
            return "";
        case "rechargeAmount":
            if (!value) {
                return "Recharge amount should not be empty";
            }
            if (!/[0-9]{1}/.test(value)) {
                return "enter only numbers"
            }
            if (value <= 0) {
                return "Amount should be greater than 0";
            }
            if (value < 50) {
                return "Amount should be greater than or eqaul to 50 only";
            }
            return "";
            case "password":
                if (!value) {
                    return "Password amount should not be empty";
                }
                if (!/[0-9]{1}/.test(value)) {
                    return "enter only numbers"
                }
                if (value <= 0) {
                    return "Password should be greater than 0";
                }
                if (value < 4) {
                    return "Password should be 4 digit only";
                }
                return "";

        default:
            return "";
    }
};
export default validateField;
