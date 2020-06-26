/*
 * Class for get account according to the search and edit
 * @auther : Parul
 * @date : 26-06-2020
 * 
 */
public with sharing class AccountSearchController {
    /*
     * Function is used to get account accoding to the searchTerm parameter
     */
    @AuraEnabled
    public static List<Account> searchAccounts( String searchTerm ) {
        List<Account> accounts = new List<Account>();
        if ( String.isNotBlank( searchTerm ) ) {
            List<List<SObject>> searchResults = [
                FIND :searchTerm
                RETURNING Account(
                    Id, Name, Phone, Website,
                    BillingStreet, BillingCity,
                    BillingState, BillingPostalCode
                    ORDER BY Name
                    LIMIT 10
                )
            ];
            accounts = searchResults[0];
        }
        return accounts;
    }
    
    /*
     * Function is used to save the account
     */
    @AuraEnabled
    public static void updateAccount(List<Account> acc ){
        update acc;
    }
}
