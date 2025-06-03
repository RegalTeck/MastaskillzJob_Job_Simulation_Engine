def test_sample_task_generation():
    import requests
    response = requests.get("http://127.0.0.1:8000/generate-task/Backend%20Developer/Beginner")
    assert response.status_code == 200
    assert "instructions" in response.json()["task"]
