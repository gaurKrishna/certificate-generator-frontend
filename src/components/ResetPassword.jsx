import React, {useState} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";

const ResetPassword = () => {
    const params = useParams();
    const [result, setResult] = useState("");
    const [isSubmit, setIsSubmit] = useState(false); 

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        let formdata = new FormData(event.target);
        formdata.append("uidb64", params?.uidb64);
        formdata.append("token", params?.token);

        try{
            const res = await fetch(process.env.REACT_APP_BASE_URL + 'reset-password',{
                method: 'PATCH',
                body: formdata,
            });

            console.log(res);
            const result = await res.json();
            console.log(result, res.status);
            if(res.status === 200){
                setResult(result?.success);
                setIsSubmit(true);
            }
            else{
                setResult(result?.error);
                setIsSubmit(true);
            }
        }
        catch (e){
            console.log(e);
        }
    }

    return (
        <Jumbotron>
            <h2>Reset Password</h2>
            <form onSubmit={(event) => {onSubmitHandler(event)}} >
                <div>
                    <label>New Password:</label>
                    <br />
                    <input type="password" name="password1" required />
                </div>
                <br />
                <div>
                    <label>Confirm Password:</label>
                    <br />
                    <input type="password" name="password2" required />
                </div>
                <br />
                <input
                    type="hidden"
                    name="csrfmiddlewaretoken"
                    value="SArEpnCEm8vzyjsV2UPWRU4qQvwyjTlaMQBAmuC5KqTM5GsKnPJX7qgDGONRNQFW"
                />
                <Button variant="primary" size="lg" type="submit" className="ml-3">
                        Reset Password
                </Button>
            </form>
            {isSubmit &&(
                <div>
                    {result}
                </div>
            )}
        </Jumbotron>
    );
};

export default ResetPassword;