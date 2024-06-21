+++
title = 'Been Thinking About Graphs'
date = 2024-03-16
draft = true
+++

An idea that I’ve been finding fascinating is the possibility that every data structure can be represented and implemented as a graph. If I were to offer a formal proof for this, it would likely look something like “for any data structure D, there exists a graph G such that the essential properties and relationships of D can be represented by G." Now while my goal isn’t to formally prove this conjecture, I’d like to share why I find this interesting by spending time exploring the idea further with some examples. To the uninitiated, by graph, I am not referring to data visualization charts, but to the mathematical object and data structure that have the following three properties:

1. Vertices (or nodes): an element with or without a value.
2. Edges: lines that connect two vertices and may have annotations.
    1. Directed: has a direction (is a one-way relationship).
    2. Undirected: has no direction (is a two-way relationship).
3. Weights: numerical values on edges representing the strength of the relationship between two vertices (implicitly has a constant value of 1 by default).

[They look like this.]
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].  

You can also use words, to fit your writing style more closely[^note].
[]End Ex

This conjecture actually came about from non data-structure systems. I was originally thinking about how societies function, from the perspective of the systems that create our infrastructure, such as telecommunications networks, waste management systems, supply chains, etc. and from that, I organically drew the connection (no pun intended) to graphs, having realized that these can all be represented this way. That then spurred the question as to whether all data structures can be represented this way. I'm also of the belief that the culture around studying for technical interviews sincerely needs to change. Studying data structures and algorithms should come from a place of genuine interest and curiosity, not merely from a desire to pass an interview. So ruminating about data structures from a graph theoretic-lens was an exercise I wouldn't pass up as it has been a much more engaging way for me to process these ideas.

There is an unbounded set of arbitrary data structures, so it would be impossible to cover every example, but I will cast a wide net of categories of data structures and show how examples in each of these categories can be represented as a graph. Following this, I'll then briefly discuss a few non data structure examples, comment on related works, and then consider the implications and applications of this idea before wrapping up.

Aside: My goal here is not to discuss the relative strengths and weaknesses of one data structure against another, or to discuss their time or space complexities. It's merely to express their properties and reason about whether they fit within the properties of a graph.
## Data Structures as Graphs

### Contiguous

##### Array

*Graph*

![Array Graph Example](/images/arrayGraph.drawio.svg "Array Graph")

*Properties*

*Text*

Edges exist between each index and its associated value, and also between all of the indices from 0 up to n for the length of the array, indicating that that In their physical implementation, arrays are contiguous, meaning that the elements are adjacent to one another.  

At the risk of giving a hand-wavy explanation, I'll assert that despite elements of an array having constant time O(1) access, it will (in principle) take slightly longer (in the order of nanoseconds or picoseconds) for the electrical signals to reach elements at a memory address further away from the memory control unit than elements at an address that is closer, due to propagation delays or access latencies on the hardware level. But these have largely been mitigated in modern memory architectures. Still, this has been a thought-provoking consideration that came to me only as a result of thinking about representing an array as a graph.

##### Bitmap

*Graph*

![Bitmap Graph Example](/images/bitmap.svg "Bitmap Graph")

*Properties*

*Text*

### Linked

##### Linked List

*Graph*

![Linked List Graph Example](/images/linked-list.svg "Linked List Graph")

*Properties*

*Text*

##### Skip List

*Graph*

![Skip List Graph Example](/images/skip-list.svg "Skip List Graph")

*Properties*

*Text*

### Stacks and Queues

##### Stack

*Graph*

![Stack Graph Example](/images/stack.svg "Stack Graph")

*Properties*

*Text*

##### Queue

*Graph*

![Queue Graph Example](/images/queue.svg "Queue Graph")

*Properties*

*Text*

##### Circular Buffer

*Graph*

![Circular Buffer Graph Example](/images/circularBuffer.svg "Circular Buffer Graph")

*Properties*

*Text*

### Associative Containers

##### Hash Table

*Graph*

![Hash Table Graph Example](/images/hash-table.svg "Hash Table Graph")

*Properties*

*Text*

##### Multimap

*Graph*

![Multimap Graph Example](/images/multimap.svg "Multimap Graph")

*Properties*

*Text*

### Probabilistic

##### Bloom Filter

*Graph*

![Bloom Filter Graph Example](/images/Bloom Filter graph.svg "Bloom Filter Graph")

*Properties*

*Text*

##### Count-Min Sketch

*Graph*

![Count-Min Sketch Graph Example](/images/Count-Min Sketch graph.svg "Count-Min Sketch Graph")

*Properties*

*Text*

The Count-Min Sketch was invented by Rutgers University computer scientists Graham Cormode and S. Muthukrishnan in 2003.

### Disjoint Sets

##### Union-Find

*Graph*

![Union-Find Graph Example](/images/Union-Find graph.svg "Union-Find Graph")

*Properties*

*Text*

##### Disjoint Set Forest

*Graph*

![Disjoint Set Forest Graph Example](/images/Disjoint Set Forest graph.svg "Graph")

*Properties*

*Text*

### Suffix

##### Suffix Array

*Graph*

![Suffix Array Graph Example](/images/Suffix Array graph.svg "Suffix Array Graph")

*Properties*

*Text*

### Hybrid

##### Rope (Array + Tree)

*Graph*

![Rope (Array + Tree) Graph Example](/images/Rope (Array + Tree) graph.svg "Graph")

*Properties*

*Text*

##### Inverted Index (Hash Table + Array)

*Graph*

![Inverted Index (Hash Table + Array) Graph Example](/images/Inverted Index (Hash Table + Array) graph.svg "Inverted Index (Hash Table + Array) Graph")

*Properties*

*Text*

## Non Data-Structure Examples

[Some text]

## Algorithmic Examples

[Okay, I lied about wrapping up. The idea of considering every algorithm to be a graph algorithm is cool and I'd like show how with a few more examples.]strikethroug

### Cryptographic Algorithms

Let's take the classic RSA (Rivest-Shamir-Adleman) encryption algorithm.

![RSA Graph Example](/images/cryptoGraph.svg "RSA Graph")

### Numerical Algorithms

Deep breath. I'm going to take a crack at representing the Fast Fourier Transform (FFT) as a graph.

### Recursive Algorithms

Finally, let's look at calculating the factorial of a number.

                   factorial(4)
                        │
                        │
                        ▼
                   4 * factorial(3)
                        │
                        │
                        ▼
                   3 * factorial(2)
                        │
                        │
                        ▼
                   2 * factorial(1)
                        │
                        │
                        ▼
                   1 * factorial(0)
                        │
                        │
                        ▼
                        1

### Diagrammatic Examples

##### Flow Charts
##### Architecture Diagrams
##### Sequence Diagrams (Latencies)

All latencies can be represented with sequence diagrams. And all sequence diagrams can be represented with graphs. The edges will just need to be labeled with departure and arrival times. Here's an example.

### Social Infrastructure Examples

##### Electric Grid

##### Water Distribution

## Related Writings

Though excited about the idea, I realized that I most certainly could not have been the first to think about this conjecture. Writers have also published pieces discussing or alluding to this idea. A few examples are the following:

## Implications/Applications

## Wrapping Up

I would like to clarify that I do not intend to suggest that I believe that every problem should be considered a graph problem. It's just that graphs are at a flexible enough data structure to, in theory, model any type of data one is working with. They serve as a reliable model to offer a great deal of clarity when trying to quickly reason about the characteristics of any system, whether it be a data structure or social system. And if the conjecture is true, then perhaps every algorithm can be considered a graph algorithm.


I hope you found this as interesting I did. I also have high hopes that this makes it easier for me and others to reason about data structures by remembering that it most likely can be represented as a graph.

[^1]: My reference.
[^2]: Every new line should be prefixed with 2 spaces.  
  This allows you to have a footnote with multiple lines.
[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.