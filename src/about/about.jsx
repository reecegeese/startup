import React from "react";
import "./about.css";

export function About(props) {
  const [quote, setQuote] = React.useState("Loading...");
  const [quoteAuthor, setQuoteAuthor] = React.useState("unknown");

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);

    fetch("https://quote.cs260.click")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  return (
    <main className="container-fluid text-center">
      <div>
        <main className="container-fluid text-center pt-4 pb-4">
          <div id="picture" className="picture-box">
            <img src="Staring Cat.PNG" alt="A black cat staring at you" />
          </div>

          <p className="w-50">
            List maker is the perfect way for any group to easily collect and
            complete a list of anything. From grocery shopping to household
            chorse, list maker has got it covered. Just create your group, add
            its members, and get to making your list. You can see everything in
            the list as well as who added something, who deleted something and
            who crossed something off
          </p>
          <p className="w-50">
            I could easily copyright this idea and make a billion dollars out of
            law suits and retire in my mansion on the moon. Fortunatly for you
            i'm a nice person so this site is COMPLETLY FREE. Lucky you.
          </p>
          <p className="w-50">
            That cat staring at you is hard coded but will eventually be
            randomized and show you a new picture every time you open this page
          </p>
          <p className="w-50">
            And this line will do the same with a random quote or fact or
            somthing. I don't know yet. I'll see what's funny and pick that
          </p>

          <div className="container-fluid text-center w-50 quote-box">
            <p className="quote">"{quote}"</p>
            <p className="author">-{quoteAuthor}</p>
          </div>
        </main>
      </div>
    </main>
  );
}
