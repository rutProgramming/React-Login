import { CSSProperties } from "react";

export const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  textAlign: 'center',
};
export const styleForm= {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(234, 228, 224)',
    border: '2px solid #d8b6a4',
    boxShadow: 24,
    p: 4,
};
export const StyleHeader:CSSProperties = {

    position: 'absolute',
    top: '20px',  
    left: '20px', 
    display: 'flex',
    gap: '10px', 
};
export const navStyle:CSSProperties = {
        position: 'absolute',
        top: '20px',  
        right: '20px', 
        display: 'flex',
        gap: '10px', 
    };

 export   const linkStyle = {
        textDecoration: "none",
        color: "#a9643b", 
        fontWeight: "bold",
        borderBottom: "2px solid transparent", 
        padding: "5px",
        transition: "0.3s",
        "&:hover": {
          borderBottom: "2px solid #a9643b", 
        },
      };

 export  const buttonStyles = {
        backgroundColor: "#d8b6a4",
        color: "#fff",
        '&:hover': { backgroundColor: "#c99a8f" }
    };