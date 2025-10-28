import React from "react";
import "./about.css";

export function About() {
  return (
    <main className="container-fluid text-center">
      <div>
        <main className="container-fluid text-center pt-5 pb-5">
          <div id="picture" class="picture-box">
            <img src="Staring Cat.PNG" alt="random cat" />
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
        </main>
      </div>
    </main>
  );
}
