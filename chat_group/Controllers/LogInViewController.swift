//
//  LogInViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 12/24/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class LogInViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet var logUsername: UITextField!
    
    @IBOutlet var logPassword: UITextField!
    @IBAction func logInBTN(_ sender: Any) {
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
