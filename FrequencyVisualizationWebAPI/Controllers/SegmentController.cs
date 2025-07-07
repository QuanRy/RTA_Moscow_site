using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using FrequencyVisualization.Services;
using FrequencyVisualization.ObjectModel;
using Microsoft.AspNetCore.Authorization;

namespace FrequencyVisualizationWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class SegmentController : ControllerBase
    {
        private ISegmentService SegmentService { get; set; }
        private ICompanyService CompanyService {  get; set; }

        public SegmentController(ISegmentService segmentService, ICompanyService companyService)
        {
            SegmentService = segmentService;
            CompanyService = companyService;
        }

        [HttpPost]
        public ActionResult<Segment> CreateSegment(string nameSegment, Guid companyId)
        {
            try
            {
                return SegmentService.CreateSegment(nameSegment, companyId, CompanyService);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        public ActionResult DeleteSegment(Guid id)
        {
            try
            {
                SegmentService.DeleteSegmentById(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
