import {createMuiTheme} from "@material-ui/styles";

const theme = createMuiTheme({
    colors: {
        lightGreen: "#60AD5A", 
    },
    
    typhography: {
        fontFamily: ["Montserrat", "-apple-system", "sans-serif"].join(","),
    }

});

export default theme;