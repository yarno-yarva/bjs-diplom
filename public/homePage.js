const logOut = new LogoutButton();
logOut.action = logoutClick => ApiConnector.logout(response => location.reload());

ApiConnector.current(response => {
	if (response.success) {
    	ProfileWidget.showProfile(response.data);
	}
});

const rates = new RatesBoard();
setInterval( ApiConnector.getStocks(response => {
	if(response.success) {
		rates.clearTable();
		rates.fillTable(response.data)
	}
}), 60000 );

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
   	if (response.success) {
   		moneyManager.setMessage(response.success, `Успешно переведено  ${data.amount} ${data.currency}`);
   		ProfileWidget.showProfile(response.data);
    } else {
   		moneyManager.setMessage(response.success, response.error);
    	}
    })
}

moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
	if (response.success) {
		moneyManager.setMessage(response.success, `Успешная конвертация  ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}`);
		ProfileWidget.showProfile(response.data);	
	} else {
		moneyManager.setMessage(response.success, response.error);	
		}
	})
}

moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response =>{
	  if(response.success) {
         moneyManager.setMessage(response.success, `Успешно переведено  ${data.amount} ${data.currency}`);
         ProfileWidget.showProfile(response.data);	
      } else {
         moneyManager.setMessage(response.success, response.error);	
	  }
	})
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if(response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
	if(response.success) {
		favoritesWidget.setMessage(response.success, `Добавлен пользователь  ${data.name} c номером ID: ${data.id}`)	
        favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	} else {
        favoritesWidget.setMessage(response.success, response.error);
		}
	})
}

favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
	if(response.success) {
		favoritesWidget.setMessage(response.success, `Удален пользователь номером ID: ${data}`)	
        favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	} else {
        favoritesWidget.setMessage(response.success, response.error);
		}
	})
}

