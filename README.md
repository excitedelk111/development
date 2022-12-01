# Development

### Link to Deployed Website

https://excitedelk111.github.io/development

### Goal and Value of the Application

Goal: allow users to look at key market data on the top 100 cryptocurrencies (by market cap).

Value: lets users configure a fictional portfolio of cryptocurrencies to help with diversification strategies.

### Usability Principles Considered

Layout

- All components are centrally aligned.
- The page starts off with wider components and moves to narrower components as you go from
  top to bottom which encourages a reading path.
- Action buttons ("Add to Portfolio", "Remove from Portfolio" and "Reset Portfolio") are at
  the end of user scan patterns (either at the bottom of a div or end of a row).
- The portfolio is at the top of the page and unpopulated which indicates to the user that
  the primary task on this page is to populate the portfolio.
- The filters and sort sections follow this and tell the user that they can interact with the
  data they see (or have been seeing peripherally thus far).
- Lastly, they see the data and the "Add to Portfolio" button. They now know exactly what they
  can (and should) do.

Visual

- Multiple ways of conveying information. For 24H pricing information, I use both the up arrow
  and the green color (or the down arrow and the red color) to convey price direction.
- The only different colors on the page are red and green helping draw attention to key information
  while also maintaining consistent styling everywhere else.
- Every item card has an image in addition to both name and ticker helping draw easy mental
  associations for users.

Hierarchy

- All headers have larger font sizes. This is true for item cards where name and ticker have a
  larger font size.
- This is also true for the portfolio where the total portfolio value has a much larger font size
  helping draw attention to it.

### Organization of Components

App contains the following divs:

- portfolio-container: this div contains the portfolio table and all code
  (`addToPortfolio()`, `removeFromPortfolio()`, `determinePortfolioValue()`,
  `resetPortfolio()`) associated with this div can be found within App.
- sort-container: this div contains the 3 sorting options available to users and
  all code (`masterSort()`) associated with this div can be found within App.
- filter-container: this div contains the 3 filtering options available to users and
  all code (`masterFilter()`) associated with this div can be found within App.
- coin-container: this div contains all the item cards (CoinCard components) displayed
  on the website and all code (primarily multiple `useEffect()`s) associated with this
  div can be found within App.

### How Data is Passed Down Through Components

I only have one component called CoinCard. This is what represents each item on the website.
Everything dispalyed on each item card is passed down as props from App. All the data is
retrieved in real time via an API call to coingecko. This data updates every few minutes
so all the data you are seeing is real time pricing information on the top 100 cryptocurrencies
sorted by market cap.

### How the User Triggers State Changes

State changes are trigerred when the user hits any of the interactive buttons on the website.
This includes any of the "Sort By" radio buttons (only one of which can be selected at a given time),
any of the "Filter By" checkboxes (any and all combinations can be selected at a given time), the
"Add to Portfolio", "Remove from Portfolio" and "Reset Portfolio" buttons. Some of these buttons
may not trigger a visual state change when pressed. For example, hitting the "Reset Portfolio"
button when there is nothing in your portfolio or selecting the "In The Green" filter when the
"In My Portfolio" filter is already selected and your portfolio consists of all coins that are
in the green will result in no visual state changes.
