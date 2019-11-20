Feature: Customer view product details

  Scenario: Customer see popular product
    Given Customer open home page
    When Customer wait 1 seconds
    Then Popular products are displayed

  Scenario Outline: Customer open <category> category
    Given Customer open home page
    When Customer clicks on category <category>
    Then Product category <category> is displayed
  Examples:
    | category     |
    | Art          |
    | Clothes      |
    | Accessories  |