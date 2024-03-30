import React from "react";

// Define props type
interface NewPageProps {
    // Define props here
    someProp: string;
}

// Use props in the function signature
function NewPage(props: NewPageProps): JSX.Element {
    return (
        <div>
            NEWPAGE
            {/* Access props */}
            <p>{props.someProp}</p>
        </div>
    );
}

export default NewPage;
