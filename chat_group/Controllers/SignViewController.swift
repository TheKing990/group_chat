//
//  SignViewController.swift
//  chat_group
//
//  Created by Jhovany Gonzalez on 12/24/17.
//  Copyright © 2017 Jhovany Gonzalez. All rights reserved.
//

import UIKit

class SignViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet var SignUsername: UITextField!
    
    @IBOutlet var SignPassword: UITextField!
    @IBAction func signbtn(_ sender: Any) {
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }

}
