import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

    
    return (
        <>
            <div className="text-center mt-3 m-5">
                <h1>Welcome!</h1>
                <p>to Bullinger's Figure of Speech used in the Bible</p>
            </div>
            <div className="text-center mt-1 m-5">
                <p>This developing web app aims to display all the research found in Bullinger's Figure of Speech in it's full and accurate form.</p>
                <h5 className="m-5 fs-3">But your help is needed!</h5>
                <p>The information in each figure of speech is <strong>not fully accurate</strong> according to the printed book, so as you go through this app, feel free to <strong>edit things</strong> as you see them!</p>
                <p>Follow the buttons on your top navigation bar to import and export the database file for the entire book.</p>
                <p>As you edit things, the database will be updated.</p>
                <br></br>
                <p>If you decide to edit...</p>
                <p><strong>Please export and email me an updated database file periodically so I can import it into the master application, specifying what you have corrected, at "marshnickol101@gmail.com".</strong></p>
                <br></br>
                <p>I will be updating the database file periodically on this project's <Link to='https://github.com/MarshallNickolauson/bullinger-fos'>GitHub Page</Link>.</p>
                <p>So download and import that file as new ones come out. Their format will be <strong>"bullinger_fos_MM_DD_YYYY.sql".</strong></p>
                <br></br>
                <p>Thanks for checking this out!</p>
                <p>-Marshall N.</p>
            </div>
        </>
    )
}