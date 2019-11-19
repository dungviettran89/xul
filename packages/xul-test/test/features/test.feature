Feature: Customer view product details

  Scenario: Customer see popular product
    Given Customer open home page
    When Customer wait 3 seconds
    Then Popular products are displayed

  Scenario: Customer see popular product 2nd times
    Given Customer open home page
    When Customer wait 2 seconds
    Then Popular products are displayed

  Scenario: Customer see popular product 3nd times
    Given Customer open home page
    When Customer wait 1 seconds
    Then Popular products are displayed