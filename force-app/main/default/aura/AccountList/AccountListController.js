({
    onAccountsLoaded: function( component, event, helper ) {
        var cols = [
            {
                'label': 'Name',
                'fieldName': 'Name',
                'type': 'text'
            },
            {
                'label': 'Phone',
                'fieldName': 'Phone',
                'type': 'phone'
            },
            {
                'label': 'Website',
                'fieldName': 'Website',
                'type': 'url'
            },
            {
                'label': 'Action',
                'type': 'button',
                'typeAttributes': {
                    'label': 'View details',
                    'name': 'view_details'
                }
            }
        ];
        var colsToEdit = [
            {
                'label': 'Name',
                'fieldName': 'Name',
                'type': 'text',
                'editable' : 'true'
            },
            {
                'label': 'Phone',
                'fieldName': 'Phone',
                'type': 'phone',
                'editable' : 'true'
            },
            {
                'label': 'Website',
                'fieldName': 'Website',
                'type': 'url',
                'editable' : 'true'
            }
        ];
        component.set( 'v.cols', cols );
        component.set( 'v.colsToEdit', colsToEdit );
        component.set( 'v.rows', event.getParam( 'accounts' ) );
        component.set( 'v.rowsToEdit', event.getParam( 'accounts' ) );
    },
    onRowAction: function( component, event, helper ) {
        var action = event.getParam( 'action' );
        var row = event.getParam( 'row' );
        if ( action.name == 'view_details' ) {
            var navigation = component.find( 'navigation' );
            navigation.navigate({
                'type': 'standard__recordPage',
                'attributes': {
                    'objectApiName': 'Account',
                    'recordId': row.Id,
                    'actionName': 'view'
                }
            });
        }
    },
    handleRowAction:function(component, event, helper ) {
        var selRows = event.getParam('selectedRows');
        if($A.util.isEmpty(selRows) == false) {
            component.set("v.disabledButton", false);
            component.set("v.selectedAccount",selRows );
        } else {
            component.set("v.disabledButton", true);  
        }
    },
    handleSaveEdition: function(component, event, helper ) {
        var draftValues = event.getParam('draftValues');
        console.log(draftValues);
        var action = component.get("c.updateAccount");
        console.log(action);
        action.setParams({"acc" : draftValues});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The account's info has been updated.",
                    "type": "success"
                });
                toastEvent.fire();
                helper.backToSearchPage(component);
            }
        });
        $A.enqueueAction(action);
    },
    handleClick:function(component, event, helper ) {
        component.set("v.showTableCondition", false);
        var event = $A.get( "e.c:AccountsLoaded" );
        var selRows = component.get("v.selectedAccount");
        console.log(selRows);
        event.setParams({
            "accounts": selRows
        });
        event.fire();
    },
    handleClickBack:function(component, event, helper ) {
        helper.backToSearchPage(component);
    },
})