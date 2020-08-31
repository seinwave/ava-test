# The Ava Test

## Objective

Create a real-time collaborative conversation-transcription editor, for two humans to use concurrently. In the spirit of Google Docs, but for transcribed conversations.

Specifics include:

- A backend, deployed to a secure endpoint, that handles JSON-encoded requests.
- A frontend, written in a modern JS framework (like React), that allows various advanced interactions with the text.
- An OT algorithm that handles INSERT and DELETE mutations, from two different users.


## Development 

### Step One: Orientation / Planning

I'm resisting the urge to get coding right away. I want to take my time to orient myself to the challenge, and make a plan to move forward. 

Breaking down this project in to its parts, I see that some of it is comfortably in my wheelhouse, and some of it is not.

A Node backend, and a React frontend? Pretty familiar to me.

OT algorithms, on the other hand? Never heard of 'em, until seeing this challenge.

From [what](https://sharejs.org/) I [read](https://stackoverflow.com/questions/26694359/differences-between-ot-and-crdt?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa), implementing an industry-ready OT algorithm can be a bit of a bear. 

But my sense of this project is that I won't *need* to implement one, until I'm ready. For now I can focus on the basic parts of the frontend / backend, and find a passable OT library to handle text mutations.

So that's where I'll start — with dummy mockups for the front and backends

### Step Two: Dummy front and backends

First things first, I wanted to get my server up and running. 

That was easy enough. Configured some basic routes with `Node.js` and `Express`, and testing with `Postman`. Now, each route is returning what it's supposed to (roughly).

![postman testing screenshot](doc-assets/author-info.png).

After that, I wanted to make a bare-bones version of the front-end, that roughly mimicked what the Ava test criteria are asking for:

![conversation list](doc-assets/conv-list.png)

![conv](doc-assets/conv.png)

It's not much. There's no routing. No functionality. You click a button and it does...nothing.

But it's there, and it's a start!

The next step will be to get the front- and back-ends talking with each other. 

### Step Three: Making connections

Hooking up the front- and back-end was straightforward, but with a few hiccups. Mostly, these had to do with how back-end routes interacted with state updates in React.

I'll try to explain. 


- #### The `.txt` / `.json` issue
When I first set up the app's functionality, I stored all the conversations at `.txt` files in the server. Why I did that, I don't know. In retrospect, it's so obviously a bad idea. 

The `.txt` format didn't fit the complex operations I wanted to perform on these files. What if I wanted to re-write their contents? Or record their last mutations? Having no other fields but the file itself made that really difficult.

So, I had to revise the code. `JSON` was obviously the better choice. 

All the server routes / front end functions that were working with plain `.txt`, now had to work with `.json`s. Making this transition was less painful than I thought it would be. But it definitely slowed me down. 

- #### Star toggling + local storage 
Another (smaller) issue I had was messing around with the `star` toggling. I realized that storing a conversation's `star` status in the React state wouldn't work — it would keep getting deleted on page refresh.

And I couldn't send the star-status to the backend, because the project brief specifically says that starring and un-starring should be local only. 

The best solution, I thought, was local-storage. And it works! 

#### Bonus functions
In the process of development, I added two "bonus" functions that weren't described in the brief, but I believe enhance the app.
- ##### New+
This was my most important addition, I think. Since the project brief calls for the ability to *delete* conversations, I thought it was very important that the user be able to *add* them.

Otherwise, you could keep deleting conversations until there were none left — and then what? Have to use some server-side fiddling to get a new conversation in there?

Not ideal.

`New+` seemed like a fitting solution.

- ##### Rename
Since I added a `New+` button, I needed a default name for new conversations. I decided to do `NewConversation` + the last 3 digits of the Unix time-stamp of when the conversation was created.

But of course we don't want to keep that name! It's too weird! We need to be able to rename these conversations, too!

Hence, the `rename` route in the `conversations` part of the API.

It worked pretty well, except for two things...

###### fs.rename() vs fs.renameSync()
This was very frustrating, and hard to spot. 

At first, I tried firing my `rename` function with `fs.rename` in Node. Like this:

```
    fs.rename(oldPath, newPath, (err) => {
        if (err) console.log(err)
    });

    fs.writeFile(newPath, newConversationData, err =>{
        if (err) console.log(err);
    })
```

That got the job done...sometimes.

Other times, it would lead to errors, where the `fs.rename()` wouldn't finish, before `fs.writeFile()` began to rewrite the conversation's data.

As a result, the file's data would be mutated, but its *name* would stay the same. Suboptimal, to say the least!

So I had to rewrite the code, like so:

```
 
    fs.renameSync(oldPath, newPath, (err) => {
        if (err) console.log(err)
    });

    fs.writeFile(newPath, ready, err =>{
        if (err) console.log(err);
    })
```

The `Sync` makes all the difference. Now `fs.renameSync()` *has* to finish, before `fs.writeFile()` begins. 

##### The subsciption issue
More on this, under *Flaws* down below. 

### Step Four: The OT Algorithm
- #### Trying to grok OT
- #### Knowing my limitations
- #### Trying some libraries
    - `shareJS`, `shareDB`
    - ##### How to deploy to React?
        - Searching the `shareDB` repo
- #### Getting mutations
    - `doc.on(op)`

### Step Five: Auditing & Deployment
- #### Lighthouse
When I wrap up a project, I like to do a quick [lighthouse](https://developers.google.com/web/tools/lighthouse/) audit, to see if I missed anything.

As it turns out, I missed quite a bit! Mostly on the accessibility front — which is sort of egregious, considering the purpose of this app!

But they were easy fixes. Adding labels, changing up some styles, etc. 

And I can't be too unhappy with my final score:

![Final lighthouse score](doc-assets/lighthouse-audit.png)

- #### Heroku / Github pages
For deployment, I decided to go with my usual stack: `Heroku` and `gh-pages`. 

Why? They're both simple and intuitive services, and cheap. (Although I am paying the extra $$$ to make sure my `Heroku` dynamo never sleeps. Money well-spent, in my opinion.)

## Post-development evaluation
- ### Successes
    - #### Functional RT collaboration
    - #### Legible code


- ### Flaws
    - #### Rewriting deletes content
    - #### No author data
    - #### No focus on new conversation
    - #### No 'undo'
    - #### Took longer than I'd like 
    


