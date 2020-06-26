({
    backToSearchPage : function(component) {
        var navigateEvent = $A.get("e.force:navigateToComponent");
        navigateEvent.setParams({
            componentDef: "c:AccountSearch"
        });
        navigateEvent.fire();
    }	
})