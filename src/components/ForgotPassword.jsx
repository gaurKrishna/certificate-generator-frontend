import React, {useState} from "react";
import { Jumbotron, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {

    const [result, setResult] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    
        return (
            <Jumbotron>
                <h2>Forgot Password</h2>
                <form
                    onSubmit={async (event) => {
                            event.preventDefault();
                            let formdata = new FormData(event.target);
                            try{
                                const res = await fetch(process.env.REACT_APP_BASE_URL + 'password-reset-email',{
                                    method: 'POST',
                                    body: formdata,
                                });
                                const result = await res.json();
                                console.log(result, res.status);
                                if (res.status === 200){
                                    setResult(result?.success);
                                    setIsSubmit(true);
                                }
                                else{
                                    setResult(result?.error);
                                    setIsSubmit(true);
                                }
                            } catch (e){
                                console.log(e);
                            }
                        } 
                    }
                >
                    <div>
                        <label>Email Id:</label>
                        <br />
                        <input type="text" name="email" required />
                    </div>
                    <br />
                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value="SArEpnCEm8vzyjsV2UPWRU4qQvwyjTlaMQBAmuC5KqTM5GsKnPJX7qgDGONRNQFW"
                    />
                    <Button variant="primary" size="lg" type="submit" className="ml-3">
                        Send Password Reset Mail
                    </Button>
                </form>
               {isSubmit && (
                <div>
                    {result}
                </div>
               )}
            </Jumbotron>
        );
    };


export default ForgotPassword;