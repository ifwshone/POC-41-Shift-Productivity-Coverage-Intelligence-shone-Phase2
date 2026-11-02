import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_uat_audit():
    # Setup Chrome options
    options = Options()
    # options.add_argument('--headless=new') # Uncomment to run in headless background mode
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--disable-gpu')
    
    # Selenium Manager automatically handles drivers natively (No ChromeDriverManager needed!)
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)
    report_lines = ["RealRails Shift Productivity - UAT Test Report\n", "="*46, "\n"]
    
    try:
        # Target URL
        target_url = "https://poc-41-shift-productivity-coverage-rit9.onrender.com/"
        driver.get(target_url)
        report_lines.append(f"Target URL: {target_url}\n")
      # Test Case 1: Visual Load & Viewport (Includes Render Cold-Start Buffer)
        try:
            # Render free tier can take 50+ seconds to wake up from sleep
            cold_start_wait = WebDriverWait(driver, 60)
            
            cold_start_wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'bg-deep')]")))
            cold_start_wait.until(EC.presence_of_element_located((By.CLASS_NAME, "radar")))
            
            report_lines.append("TC-1 (Visual Load): PASS - Background and map visualization container are visible.\n")
        except Exception as e:
            report_lines.append(f"TC-1 (Visual Load): FAIL - {str(e)}\n")

        # Test Case 2: The Handshake (Click marker and verify panel)
        try:
            marker = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'marker') and contains(@aria-label, 'Facility A')]")))
            marker.click()
            
            # Verify Intelligence Panel slides into view
            wait.until(EC.presence_of_element_located((By.XPATH, "//aside[@aria-hidden='false']")))
            
            # Verify KPI rendering inside the panel
            wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'font-display') and contains(@class, 'text-6xl')]")))
            
            # Close the panel
            close_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Close intelligence panel']")))
            close_btn.click()
            
            # Wait for panel to hide
            wait.until(EC.presence_of_element_located((By.XPATH, "//aside[@aria-hidden='true']")))
            report_lines.append("TC-2 (The Handshake): PASS - Marker clicked, intelligence panel opened, data loaded, and panel closed successfully.\n")
        except Exception as e:
            report_lines.append(f"TC-2 (The Handshake): FAIL - {str(e)}\n")

        # Test Case 3: The Signature (Info icon and Developer ID)
        try:
            info_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Project information']")))
            info_btn.click()
            
            # Verify developer name is present
            wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(text(), 'Shone Shinoy')]")))
            report_lines.append("TC-3 (The Signature): PASS - Info modal opened and operative identity 'Shone Shinoy' verified.\n")
        except Exception as e:
            report_lines.append(f"TC-3 (The Signature): FAIL - {str(e)}\n")

        # Capture final state screenshot
        screenshot_path = os.path.join(os.getcwd(), "uat_final_state.png")
        driver.save_screenshot(screenshot_path)
        report_lines.append(f"\nScreenshot saved to: {screenshot_path}\n")

    finally:
        driver.quit()
        
        # Write results to Test_Report.txt
        with open("Test_Report.txt", "w") as f:
            f.writelines(report_lines)
        print("Audit complete. Please review Test_Report.txt.")

if __name__ == "__main__":
    run_uat_audit()