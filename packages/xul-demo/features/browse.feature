Feature: Customer can browse products

  Scenario Outline: Customer can view all product details
    Given Customer open home page
    Then Popular products are displayed
    When Customer clicks on category <category>
    Then Product category <category> is displayed
    When Customer clicks on product "<product>"
    Then Product page "<product>" is displayed
    When Customer clicks on Add To Card
    Then Product successfully added to shopping cart
    When Customer close cart modal
    And Customer clicks on Cart
    Then Shopping cart should contains product "<product>"
    When Customer clicks on Check out
    Examples:
    | category     | product                        |
    | Art          | any                            |
    | Clothes      | Hummingbird printed t-shirt    |
    | Accessories  | Mug Today is a good day        |