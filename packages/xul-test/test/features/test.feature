Feature: Customer view product details

  Scenario: Customer see popular product
    Given Customer open home page
    When Customer wait 1 seconds
    Then Popular products are displayed

  Scenario: Customer open Clothes category
    Given Customer open home page
    When Customer clicks on category Clothes
    Then Product category Clothes is displayed