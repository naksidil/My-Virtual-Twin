using System.Text.Json;
using System.Text;
using Virtual.Helper;
using Virtual.Helper.CommonModels;

namespace VirtualTwin.Configuration {
	public static class HttpClientHelper {

		private static string BaseAdressLink => "http://127.0.0.1:8000";

		static readonly HttpClient HttpClient = new() {
			BaseAddress = new(BaseAdressLink),
			DefaultRequestHeaders = {
			{ "Accept", "*/*" },
        }
		};

		static readonly JsonSerializerOptions jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

		//#region Örnek
		public static async Task<ServiceResponse<object>> Generate3DModel(BodyMeasurements bodyMeasurements) {
			string url = "/generate-3d-model/";
			return await PostRequest<object>(bodyMeasurements, url, false);
		}
		//#endregion

		//GET - POST(PUT) Requests
		private static async Task<ServiceResponse<T>> GetRequest<T>(string url) {
			ServiceResponse<T> response = new();
			try {
				using HttpResponseMessage httpResponseMessage = await HttpClient.GetAsync(url);
				string responseMessageContent = await httpResponseMessage.Content.ReadAsStringAsync();
				if (httpResponseMessage.IsSuccessStatusCode) {
					response.Success = true;
					response.Data = JsonSerializer.Deserialize<T>(responseMessageContent, jsonSerializerOptions);
				}
				else {
					response.Success = false;
					response.ErrorMessage = $"İstek sırasında hata oluştu: {(int)httpResponseMessage.StatusCode} {httpResponseMessage.ReasonPhrase}";
				}
			}
			catch (Exception ex) {
				response.Success = false;
				response.ErrorMessage = $"Hata: {ex.Message}";
			}

			return response;
		}
		private static async Task<ServiceResponse<T>> PostRequest<T>(object model, string url, bool put = false) {
			ServiceResponse<T> response = new();
			try {
				StringContent stringContent = new(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json");
				HttpResponseMessage httpResponseMessage;
				if (put) httpResponseMessage = await HttpClient.PutAsync(url, stringContent);
				else httpResponseMessage = await HttpClient.PostAsync(url, stringContent);
				string responseMessageContent = await httpResponseMessage.Content.ReadAsStringAsync();
				if (httpResponseMessage.IsSuccessStatusCode) {
					response.Success = true;
					response.Data = JsonSerializer.Deserialize<T>(responseMessageContent, jsonSerializerOptions);
				}
				else {
					response.Success = false;
					response.ErrorMessage = $"İstek sırasında hata oluştu: {(int)httpResponseMessage.StatusCode} {httpResponseMessage.ReasonPhrase}";
				}
				httpResponseMessage.Dispose();
			}
			catch (Exception ex) {
				response.Success = false;
				response.ErrorMessage = $"Hata: {ex.Message}";
			}
			return response;
		}

	}

}
