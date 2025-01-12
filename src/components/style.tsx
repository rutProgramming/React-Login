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
    bgcolor: 'background.paper',
    border: '2px solid #000',
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