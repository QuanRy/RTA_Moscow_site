using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using FrequencyVisualization.Services;
using FrequencyVisualization.ObjectModel;
using FrequencyVisualization.ObjectModel.ViewModel;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Microsoft.AspNetCore.Authorization;

namespace FrequencyVisualizationWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private ICompanyService CompanyService { get; set; }


        public CompanyController(ICompanyService companyService)
        {
            CompanyService = companyService;
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<CompanyViewModel>> GetCompanies(Guid userId)
        {
            try
            {
                return CompanyService.GetCompanies(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Company> GetCompanyById(Guid id)
        {
            try
            {
                return CompanyService.GetCompanyById(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public ActionResult<Company> CreateCompany(string nameCompany, Guid UserId)
        {
            try
            {
                return CompanyService.CreateCompany(nameCompany, UserId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public ActionResult<Company> SaveCompany(Company company)
        {
            try
            {
                return CompanyService.SaveCompany(company);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCompany(Guid id)
        {
            try
            {
                CompanyService.DeleteCompany(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
