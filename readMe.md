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

So that's where I'll start. With the backend.

### Step Two: The Backend



